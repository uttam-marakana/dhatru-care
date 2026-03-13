import { useEffect, useState, useMemo } from "react";
import {
  subscribeUserAppointments,
  cancelAppointment,
  rescheduleAppointment,
} from "../../api/appointmentsApi";

import { useAuth } from "../../context/AuthContext";
import Container from "../../components/layout/Container";

/* STATUS BADGE STYLES */

const statusStyles = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-green-500/20 text-green-400",
  completed: "bg-blue-500/20 text-blue-400",
  cancelled: "bg-red-500/20 text-red-400",
  rejected: "bg-red-500/20 text-red-400",
  rescheduled: "bg-purple-500/20 text-purple-400",
};

/* EDIT RULE */

const isEditable = (status) =>
  ["pending", "confirmed", "rescheduled"].includes(status);

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

  /* SUBSCRIBE USER APPOINTMENTS */

  useEffect(() => {
    if (!user) return;

    const unsub = subscribeUserAppointments(user.uid, (data) => {
      setAppointments(data);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  const now = new Date();

  /* FILTER GROUPS */

  const upcoming = useMemo(
    () =>
      appointments.filter(
        (a) =>
          new Date(`${a.date} ${a.time}`) >= now && a.status !== "cancelled",
      ),
    [appointments],
  );

  const past = useMemo(
    () =>
      appointments.filter(
        (a) =>
          new Date(`${a.date} ${a.time}`) < now && a.status !== "cancelled",
      ),
    [appointments],
  );

  const cancelled = useMemo(
    () => appointments.filter((a) => a.status === "cancelled"),
    [appointments],
  );

  const visible = {
    all: appointments,
    upcoming,
    past,
    cancelled,
  }[tab];

  /* OPEN CANCEL MODAL */

  const openCancel = (appt) => {
    setSelectedAppointment(appt);
    setCancelModal(true);
  };

  const confirmCancel = async () => {
    await cancelAppointment(selectedAppointment.id, selectedAppointment.slotId);
    setCancelModal(false);
  };

  /* OPEN RESCHEDULE MODAL */

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

        {/* TABS */}

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["all", "upcoming", "past", "cancelled"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                tab === t
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* APPOINTMENT LIST */}

        {visible.length === 0 ? (
          <p className="text-center text-gray-400">No appointments found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((a) => (
              <div
                key={a.id}
                className="p-6 rounded-2xl bg-gray-900 border border-white/10"
              >
                <div className="space-y-2 text-gray-200">
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

                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusStyles[a.status]
                    }`}
                  >
                    {a.status}
                  </span>

                  {/* ACTION BUTTONS */}

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
                        className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
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

        {/* CANCEL MODAL */}

        {cancelModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
              <h3 className="text-lg text-white mb-4">Cancel Appointment?</h3>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCancelModal(false)}
                  className="px-4 py-2 border border-gray-600 rounded"
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

        {/* RESCHEDULE MODAL */}

        {rescheduleModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
              <h3 className="text-white mb-4">Reschedule Appointment</h3>

              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-3 mb-3 bg-gray-800 rounded"
              />

              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-800 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setRescheduleModal(false)}
                  className="px-4 py-2 border border-gray-600 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmReschedule}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
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
