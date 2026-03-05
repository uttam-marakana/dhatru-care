import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { updateAppointmentStatus } from "../api/appointmentsApi";
import Container from "../components/layout/Container";

export default function UserAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await updateAppointmentStatus();
      const mine = all.filter((a) => a.userId === auth.currentUser?.uid);
      setAppointments(mine);
    };
    load();
  }, []);

  return (
    <section className="py-16 bg-(--bg)">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-(--text)">
          My Appointment
        </h1>

        {appointments.length === 0 ? (
          <p className="text-(--text-secondary)">No appointments yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div
                key={a.id}
                className="
                p-4 rounded-xl
                border border-(--border)
                bg-(--card)
                "
              >
                <p>
                  <strong>Date:</strong> {a.date}
                </p>

                <p>
                  <strong>Department:</strong> {a.department}
                </p>

                <p>
                  <strong>Status:</strong> {a.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
