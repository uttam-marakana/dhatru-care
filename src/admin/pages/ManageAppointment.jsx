import { useEffect, useState } from "react";
import {
  subscribeAppointments,
  updateAppointmentStatus,
} from "../../api/appointmentsApi";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  /* ================= CALENDAR GROUPING (STEP 5) ================= */
  const groupedByDate = appointments.reduce((acc, appointment) => {
    const date = appointment.date || "No Date";

    if (!acc[date]) acc[date] = [];
    acc[date].push(appointment);

    return acc;
  }, {});

  /* ================= RENDER ================= */
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Manage Appointments</h1>

      {Object.keys(groupedByDate).length === 0 && <p>No appointments yet.</p>}

      {Object.keys(groupedByDate)
        .sort()
        .map((date) => (
          <div key={date}>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">{date}</h2>

            <div className="space-y-4">
              {groupedByDate[date].map((a) => (
                <div
                  key={a.id}
                  className="p-4 border rounded-lg flex flex-col md:flex-row md:justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold">{a.patientName}</p>
                    <p>{a.time}</p>
                    <p>{a.department}</p>
                    <p>Status: {a.status}</p>
                  </div>

                  <select
                    value={a.status}
                    onChange={(e) =>
                      updateAppointmentStatus(a.id, e.target.value)
                    }
                    className="p-2 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
