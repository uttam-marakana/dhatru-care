import { useEffect, useState, lazy } from "react";

import { subscribeUserAppointments } from "../../api/appointmentsApi";
import { useAuth } from "../../context/AuthContext";

const Container = lazy(() => import("../../components/layout/Container"));

export default function UserAppointments() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeUserAppointments(user.uid, (data) => {
      setAppointments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  /* LOADING STATE */

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-[var(--text-secondary)] bg-[var(--section)]">
        Loading appointments...
      </div>
    );
  }

  return (
    <section className="relative py-20 md:py-24 bg-[var(--section)] text-[var(--text)] overflow-hidden">
      {/* Background Glow */}
      <div
        className="
        pointer-events-none
        absolute -top-40 left-1/2 -translate-x-1/2
        w-[700px] md:w-[900px]
        h-[700px] md:h-[900px]
        bg-[var(--glow-bg)]
        blur-[140px]
        rounded-full
        opacity-70
        z-0
        "
      />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto space-y-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-primary)]">
            My Appointments
          </h1>

          {appointments.length === 0 ? (
            <p className="text-center text-[var(--text-secondary)]">
              No appointments found.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {appointments.map((a) => (
                <div
                  key={a.id}
                  className="
                  group relative
                  bg-[var(--card)]
                  border border-[var(--border)]
                  rounded-2xl
                  p-6
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-[var(--color-primary)]/40
                  hover:shadow-[0_0_40px_var(--glow-soft)]
                  "
                >
                  {/* Hover Glow */}
                  <div
                    className="
                    absolute inset-0 rounded-2xl
                    pointer-events-none
                    bg-gradient-to-br
                    from-[var(--color-primary)]/10
                    via-transparent
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition
                    "
                  />

                  <div className="relative space-y-3 text-[var(--text)]">
                    <p>
                      <span className="text-[var(--muted)]">Patient:</span>{" "}
                      {a.patientName}
                    </p>

                    <p>
                      <span className="text-[var(--muted)]">Department:</span>{" "}
                      {a.department}
                    </p>

                    <p>
                      <span className="text-[var(--muted)]">Date:</span>{" "}
                      {a.date}
                    </p>

                    <p>
                      <span className="text-[var(--muted)]">Time:</span>{" "}
                      {a.time}
                    </p>

                    <div className="pt-3">
                      <span
                        className={`
                        px-3 py-1 text-sm rounded-full font-medium
                        ${
                          a.status === "confirmed"
                            ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                            : a.status === "completed"
                              ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
                              : "bg-[var(--color-warning)]/20 text-[var(--color-warning)]"
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
      </Container>
    </section>
  );
}
