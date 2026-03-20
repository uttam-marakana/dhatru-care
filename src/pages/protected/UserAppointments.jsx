import { useEffect, useState, useMemo } from "react";
import {
  subscribeUserAppointments,
  cancelAppointment,
  rescheduleAppointment,
} from "../../api/appointmentsApi";

import { useAuth } from "../../context/AuthContext";
import Container from "../../components/layout/Container";

/* --- STATUS BADGE STYLES ----------- */

const statusStyles = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-green-500/20 text-green-400",
  completed: "bg-blue-500/20 text-blue-400",
  cancelled: "bg-red-500/20 text-red-400",
  rejected: "bg-red-500/20 text-red-400",
  rescheduled: "bg-purple-500/20 text-purple-400",
};

/* --- EDIT RULE ----------- */

const isEditable = (status) =>
  ["pending", "confirmed", "rescheduled"].includes(status);

/* --- PAGINATION ----------- */

const PAGE_SIZE = 10;

export default function UserAppointments() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("all");

  const [cancelModal, setCancelModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const [page, setPage] = useState(1);

  /* --- SUBSCRIBE USER APPOINTMENTS ----------- */

  useEffect(() => {
    if (!user) return;

    const unsub = subscribeUserAppointments(user.uid, (data) => {
      setAppointments(data);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  /* --- RESET PAGE WHEN TAB CHANGES ----------- */

  useEffect(() => {
    setPage(1);
  }, [tab]);

  /* --- DATE HELPERS ----------- */

  const now = new Date();

  const getAppointmentDate = (a) => new Date(`${a.date}T${a.time}`);

  const todayString = new Date().toISOString().split("T")[0];

  /* --- FILTER GROUPS ----------- */

  const today = useMemo(
    () =>
      appointments.filter(
        (a) =>
          a.date === todayString &&
          !["cancelled", "rejected"].includes(a.status),
      ),
    [appointments],
  );

  /* --- UPCOMING (ONLY CONFIRMED / RESCHEDULED) ----------- */

  const upcoming = useMemo(
    () =>
      appointments.filter((a) => {
        const appointmentDate = getAppointmentDate(a);

        return (
          appointmentDate > now &&
          a.date !== todayString &&
          ["confirmed", "rescheduled"].includes(a.status)
        );
      }),
    [appointments],
  );

  /* --- AWAITING APPROVAL (PENDING) ----------- */

  const awaiting = useMemo(
    () => appointments.filter((a) => a.status === "pending"),
    [appointments],
  );

  const past = useMemo(
    () =>
      appointments.filter((a) => {
        const appointmentDate = getAppointmentDate(a);

        return appointmentDate < now || a.status === "completed";
      }),
    [appointments],
  );

  const cancelled = useMemo(
    () => appointments.filter((a) => a.status === "cancelled"),
    [appointments],
  );

  const rejected = useMemo(
    () => appointments.filter((a) => a.status === "rejected"),
    [appointments],
  );

  const visible = {
    all: appointments,
    today,
    upcoming,
    awaiting,
    past,
    cancelled,
    rejected,
  }[tab];

  /* --- PAGINATION ----------- */

  const totalPages = Math.ceil(visible.length / PAGE_SIZE);

  const paginatedAppointments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return visible.slice(start, end);
  }, [visible, page]);

  /* --- OPEN CANCEL MODAL ----------- */

  const openCancel = (appt) => {
    setSelectedAppointment(appt);
    setCancelModal(true);
  };

  const confirmCancel = async () => {
    await cancelAppointment(selectedAppointment.id, selectedAppointment.slotId);
    setCancelModal(false);
  };

  /* --- OPEN RESCHEDULE MODAL ----------- */

  const openReschedule = (appt) => {
    setSelectedAppointment(appt);
    setNewDate(appt.date);
    setNewTime(appt.time);
    setRescheduleModal(true);
  };

  const confirmReschedule = async () => {
    await rescheduleAppointment(selectedAppointment, newDate, newTime);
    setRescheduleModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-[var(--muted)]">
        Loading appointments...
      </div>
    );
  }

  return (
    <section className="section-padding">
      <Container>
        <h1 className="text-3xl font-bold mb-10 text-center gradient-heading">
          My Appointments
        </h1>

        {/* --- TABS ----------- */}

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { key: "all", label: "All", count: appointments.length },
            { key: "today", label: "Today", count: today.length },
            { key: "upcoming", label: "Upcoming", count: upcoming.length },
            {
              key: "awaiting",
              label: "Awaiting Approval",
              count: awaiting.length,
            },
            { key: "past", label: "Past", count: past.length },
            { key: "cancelled", label: "Cancelled", count: cancelled.length },
            { key: "rejected", label: "Rejected", count: rejected.length },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                tab === t.key
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--card)]"
              }`}
            >
              {t.label}

              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  tab === t.key ? "bg-white/20" : "bg-[var(--border)]"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* --- APPOINTMENT CARDS ----------- */}

        {paginatedAppointments.length === 0 ? (
          <p className="text-center text-[var(--muted)]">
            No appointments found.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {paginatedAppointments.map((a) => (
              <div
                key={a.id}
                className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover-lift"
              >
                <div className="space-y-2 text-[var(--text)]">
                  <p>
                    <span className="text-[var(--muted)]">Patient:</span>{" "}
                    {a.patientName}
                  </p>

                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--glow-bg)] flex items-center justify-center">
                      {a.doctorName?.charAt(0) || "D"}
                    </div>

                    <div>
                      <p>
                        <span className="text-[var(--muted)]">Doctor:</span>{" "}
                        {a.doctorName || "Doctor not available"}
                      </p>

                      <p className="text-xs text-[var(--muted)]">
                        {a.doctorSpecialty || ""}
                      </p>
                    </div>
                  </div>

                  <p>
                    <span className="text-[var(--muted)]">Department:</span>{" "}
                    {a.departmentName || a.department}
                  </p>

                  <p>
                    <span className="text-[var(--muted)]">Type:</span>{" "}
                    {a.appointmentType || "regular"}
                  </p>

                  <p>
                    <span className="text-[var(--muted)]">Fees:</span>{" "}
                    {a.totalAmount || 0}
                  </p>

                  <p>
                    <span className="text-[var(--muted)]">Date:</span> {a.date}
                  </p>

                  <p>
                    <span className="text-[var(--muted)]">Time:</span> {a.time}
                  </p>

                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusStyles[a.status]
                    }`}
                  >
                    {a.status}
                  </span>

                  {isEditable(a.status) && (
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => openCancel(a)}
                        className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-400"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => openReschedule(a)}
                        className="px-4 py-1.5 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90"
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

        {/* --- PAGINATION ----------- */}

        {visible.length > PAGE_SIZE && (
          <div className="flex justify-center gap-4 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border border-[var(--border)] disabled:opacity-40"
            >
              Previous
            </button>

            <span className="flex items-center text-[var(--muted)]">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-[var(--border)] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* --- CANCEL MODAL ----------- */}

        {cancelModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[var(--card)] p-6 rounded-xl w-full max-w-md border border-[var(--border)]">
              <h3 className="text-lg text-[var(--text)] mb-4">
                Cancel Appointment?
              </h3>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCancelModal(false)}
                  className="px-4 py-2 border border-[var(--border)] rounded"
                >
                  No
                </button>

                <button
                  onClick={confirmCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Yes Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- RESCHEDULE MODAL ----------- */}

        {rescheduleModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[var(--card)] p-6 rounded-xl w-full max-w-md border border-[var(--border)]">
              <h3 className="text-[var(--text)] mb-4">
                Reschedule Appointment
              </h3>

              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="ui-input mb-3"
              />

              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="ui-input mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setRescheduleModal(false)}
                  className="px-4 py-2 border border-[var(--border)] rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmReschedule}
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
