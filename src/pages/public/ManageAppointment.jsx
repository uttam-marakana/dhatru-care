import { useEffect, useState } from "react";
import {
  subscribeAppointments,
  updateAppointmentStatus,
} from "../../api/appointmentsApi";

import {
  appointmentStatusOptions,
  getStatusLabel,
  getStatusStyle,
} from "../../utils/appointmentStatus";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  /* REALTIME LISTENER */

  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage Appointments</h1>

      {/* APPOINTMENT LIST */}

      <div className="space-y-4">
        {appointments.length === 0 && (
          <p className="text-gray-500">No appointments found.</p>
        )}

        {appointments.map((a) => (
          <div
            key={a.id}
            className="
            border border-gray-200
            rounded-lg
            p-4
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            "
          >
            {/* APPOINTMENT INFO */}

            <div className="space-y-1">
              <p className="font-semibold text-lg">
                {a.patientName || "Unknown Patient"}
              </p>

              <p className="text-sm text-gray-600">
                {a.date} — {a.time}
              </p>

              <p className="text-sm text-gray-600">
                Department: {a.department || "N/A"}
              </p>

              {/* STATUS BADGE */}

              <span
                className={`
                inline-block
                mt-1
                px-3 py-1
                text-xs
                rounded-full
                ${getStatusStyle(a.status)}
                `}
              >
                {getStatusLabel(a.status)}
              </span>
            </div>

            {/* STATUS CONTROL */}

            <div>
              <select
                value={a.status}
                onChange={(e) => updateAppointmentStatus(a.id, e.target.value)}
                className="
                border
                border-gray-300
                p-2
                rounded-md
                text-sm
                "
              >
                {appointmentStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {getStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
