import {
  STATUS_TRANSITIONS,
  isFinalStatus,
  getStatusLabel,
  getStatusStyle,
} from "../../../utils/appointmentStatus";

export default function AppointmentsTable({
  appointments,
  onStatusChange,
  loadingId,
}) {
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
            let currentStatus = (a.status || "pending").toLowerCase().trim();

            if (currentStatus === "requested") {
              currentStatus = "pending";
            }

            const isLocked = isFinalStatus(currentStatus);
            const allowedNext = STATUS_TRANSITIONS[currentStatus] || [];

            return (
              <tr
                key={a.id}
                className="border-b border-[var(--border)] hover:bg-[var(--card)] transition"
              >
                <td className="p-4 font-medium">{a.patientName}</td>
                <td className="p-4">{a.doctorName}</td>
                <td className="p-4">{a.date}</td>
                <td className="p-4">{a.time}</td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${getStatusStyle(
                        currentStatus,
                      )}`}
                    >
                      {getStatusLabel(currentStatus)}
                    </span>

                    <select
                      value={currentStatus}
                      onChange={(e) => onStatusChange(a.id, e.target.value)}
                      disabled={loadingId === a.id || isLocked}
                      className="px-2 py-1 border rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={currentStatus}>
                        {getStatusLabel(currentStatus)}
                      </option>

                      {allowedNext.length === 0 && (
                        <option disabled>No actions</option>
                      )}

                      {allowedNext.map((s) => (
                        <option key={s} value={s}>
                          {getStatusLabel(s)}
                        </option>
                      ))}
                    </select>

                    {a.statusHistory?.length > 0 && (
                      <span className="text-xs text-gray-400">
                        {a.statusHistory.length}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
