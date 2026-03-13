import { useEffect, useState } from "react";
import {
  subscribeUserAppointments,
  cancelAppointment,
  rescheduleAppointment,
} from "../../api/appointmentsApi";

import { useAuth } from "../../context/AuthContext";
import Container from "../../components/layout/Container";

/* STATUS STYLES */

const statusStyles = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-green-500/20 text-green-400",
  completed: "bg-blue-500/20 text-blue-400",
  cancelled: "bg-red-500/20 text-red-400",
  rejected: "bg-red-500/20 text-red-400",
  rescheduled: "bg-purple-500/20 text-purple-400",
};

/* APPOINTMENT EDIT RULE */

const isAppointmentEditable = (status) => {
  return ["pending", "confirmed", "rescheduled"].includes(status);
};

export default function UserAppointments() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* SUBSCRIBE USER APPOINTMENTS */

  useEffect(() => {
    if (!user) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    const unsub = subscribeUserAppointments(user.uid, (data) => {
      setAppointments(data);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  /* RESCHEDULE HANDLER */

  const handleReschedule = async (appointment) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD)");
    const newTime = prompt("Enter new time (HH:MM)");

    if (!newDate || !newTime) return;

    try {
      await rescheduleAppointment(appointment, newDate, newTime);
    } catch (err) {
      alert(err.message);
    }
  };

  /* LOADING UI */

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Loading appointments...
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Container>
        <h1 className="text-3xl font-bold mb-10 text-center text-white">
          My Appointments
        </h1>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-400">No appointments found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {appointments.map((a) => (
              <div
                key={a.id}
                className="
                relative
                p-6
                rounded-2xl
                bg-gray-900
                border border-white/10
                transition
                hover:border-blue-400/40
                hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]
                "
              >
                {/* glow overlay */}
                <div
                  className="
                  absolute inset-0 rounded-2xl
                  bg-gradient-to-br
                  from-blue-500/10
                  via-transparent
                  to-transparent
                  opacity-0 hover:opacity-100
                  transition
                  pointer-events-none
                  "
                />

                <div className="relative space-y-2 text-gray-200">
                  <p>
                    <span className="text-gray-400">Patient:</span>{" "}
                    {a.patientName}
                  </p>

                  <p>
                    <span className="text-gray-400">Department:</span>{" "}
                    {a.department}
                  </p>

                  <p>
                    <span className="text-gray-400">Date:</span> {a.date}
                  </p>

                  <p>
                    <span className="text-gray-400">Time:</span> {a.time}
                  </p>

                  {/* STATUS BADGE */}

                  <div className="pt-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        statusStyles[a.status] || "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>

                  {/* ACTION BUTTONS */}

                  {isAppointmentEditable(a.status) && (
                    <div className="flex gap-3 pt-5">
                      <button
                        onClick={() => cancelAppointment(a.id, a.slotId)}
                        className="
                        text-sm
                        px-4 py-1.5
                        rounded-lg
                        bg-red-500/90
                        hover:bg-red-500
                        text-white
                        transition
                        "
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => handleReschedule(a)}
                        className="
                        text-sm
                        px-4 py-1.5
                        rounded-lg
                        bg-blue-500
                        hover:bg-blue-400
                        text-white
                        transition
                        "
                      >
                        Reschedule
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
