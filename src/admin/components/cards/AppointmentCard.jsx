export default function AppointmentCard({ appointment, onStatusChange }) {
  const statusColor = {
    pending: "text-[var(--color-warning)]",
    confirmed: "text-[var(--color-success)]",
    completed: "text-blue-400",
    rejected: "text-[var(--color-error)]",
    cancelled: "text-[var(--color-error)]",
  };

  return (
    <div
      className="
      glass
      hover-lift
      p-4 sm:p-5
      flex flex-col sm:flex-row
      sm:items-center
      sm:justify-between
      gap-4
      "
    >
      <div className="space-y-1">
        <p className="font-semibold text-[var(--text)]">
          {appointment.patientName}
        </p>

        <p className="text-sm text-[var(--text-secondary)]">
          {appointment.date} — {appointment.time}
        </p>

        <p className="text-sm text-[var(--text-secondary)]">
          {appointment.department}
        </p>

        <p
          className={`text-sm font-medium ${
            statusColor[appointment.status] || ""
          }`}
        >
          Status: {appointment.status}
        </p>
      </div>

      <div className="w-full sm:w-auto">
        <select
          value={appointment.status}
          onChange={(e) => onStatusChange(appointment.id, e.target.value)}
          className="
          w-full sm:w-auto
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-lg
          px-3 py-2
          text-sm
          "
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirm</option>
          <option value="completed">Completed</option>
          <option value="rejected">Reject</option>
          <option value="cancelled">Cancel</option>
        </select>
      </div>
    </div>
  );
}
