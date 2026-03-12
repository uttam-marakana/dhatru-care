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
          {appointments.map((a) => (
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
                  value={a.status}
                  onChange={(e) => onStatusChange(a.id, e.target.value)}
                  className="
                  p-2 rounded
                  border border-[var(--border)]
                  bg-[var(--card)]
                  "
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
