import {
  STATUS_TRANSITIONS,
  isFinalStatus,
  getStatusLabel,
} from "../../utils/appointmentStatus";

export default function AppointmentsTable({ appointments, onStatusChange }) {
  return (
    <div className="glass overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr className="text-left text-[var(--text-secondary)]">
            <th className="p-4">Patient</th>
            <th className="p-4">Doctor</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => {
            const currentStatus = (a.status || "").toLowerCase().trim();
            const isLocked = isFinalStatus(currentStatus);

            const allowedNext = STATUS_TRANSITIONS[currentStatus] || [];

            return (
              <tr
                key={a.id}
                className="border-b border-[var(--border)] hover:bg-[var(--card)]"
              >
                <td className="p-4 font-medium">{a.patientName}</td>
                <td className="p-4">{a.doctorName}</td>
                <td className="p-4">{a.date}</td>
                <td className="p-4">{a.time}</td>

                <td className="p-4">
                  <select
                    value={currentStatus}
                    disabled={isLocked}
                    onChange={(e) => onStatusChange(a.id, e.target.value)}
                    className="p-2 rounded border border-[var(--border)] bg-[var(--card)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {/* current */}
                    <option value={currentStatus}>
                      {getStatusLabel(currentStatus)}
                    </option>

                    {/* allowed transitions */}
                    {allowedNext.map((s) => (
                      <option key={s} value={s}>
                        {getStatusLabel(s)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
