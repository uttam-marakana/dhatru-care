import { useState, useEffect } from "react";
import { app, auth } from "../firebase";
import { getAppointments } from "../api/appointmentsApi";
import Container from "../components/layout/Container";

export default function UserAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await getAppointments();
      const mine = all.filter((a) => a.userId === auth.currentUser?.uid);
      setAppointments(mine);
    };
    load();
  }, []);

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-left">My Appointment</h1>

        {appointments.length === 0 ? (
          <p>Not Appointment yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div key={a.id} className="p-4 border rounded">
                <p>
                  <strong>Date:</strong>
                  {a.date}
                </p>
                <p>
                  <strong>Department:</strong>
                  {a.department}
                </p>
                <p>
                  <strong>Status:</strong>
                  {a.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
