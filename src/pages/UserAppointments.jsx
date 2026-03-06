import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { subscribeUserAppointments } from "../api/appointmentsApi";

export default function UserAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeAppointments;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAppointments([]);
        setLoading(false);
        return;
      }

      unsubscribeAppointments = subscribeUserAppointments(user.uid, (data) => {
        setAppointments(data);
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeAppointments) unsubscribeAppointments();
    };
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading appointments...
      </div>
    );
  }

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-[var(--text)]">
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
                bg-[var(--card)]
                border border-[var(--border)]
                rounded-2xl
                p-6
                transition
                hover:shadow-[0_0_35px_var(--glow-bg)]
                hover:border-blue-500/40
                "
              >
                {/* Glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none
                  bg-gradient-to-br from-blue-500/10 via-transparent to-transparent
                  opacity-0 hover:opacity-100 transition"
                />

                <div className="relative space-y-2 text-[var(--text)]">
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

                  <div className="pt-2">
                    <span
                      className={`
                      px-3 py-1 text-sm rounded-full
                      ${
                        a.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : a.status === "completed"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      }
                      `}
                    >
                      {a.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
