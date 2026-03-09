import { useEffect, useState, lazy } from "react";
import {
  subscribeUserAppointments,
  cancelAppointment,
  rescheduleAppointment,
} from "../../api/appointmentsApi";
import { useAuth } from "../../context/AuthContext";

const Container = lazy(() => import("../../components/layout/Container"));

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
  rescheduled: "bg-purple-100 text-purple-700",
};

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

    const unsub = subscribeUserAppointments(user.uid, (data) => {
      setAppointments(data);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading appointments...
      </div>
    );
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-8 text-center">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="p-6 rounded-xl border bg-white shadow-sm"
            >
              <p>
                <strong>Patient:</strong> {a.patientName}
              </p>
              <p>
                <strong>Department:</strong> {a.department}
              </p>
              <p>
                <strong>Date:</strong> {a.date}
              </p>
              <p>
                <strong>Time:</strong> {a.time}
              </p>

              <div className="pt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusStyles[a.status]}`}
                >
                  {a.status}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                {a.status !== "cancelled" && (
                  <button
                    onClick={() => cancelAppointment(a)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Cancel
                  </button>
                )}

                {a.status !== "cancelled" && (
                  <button
                    onClick={() => handleReschedule(a)}
                    className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Reschedule
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
