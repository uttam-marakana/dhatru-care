export default function AppointmentCard({ appointment, onStatusChange }) {
  return (
    <div className="border rounded p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold">{appointment.patientName}</p>
        <p>
          {appointment.date} — {appointment.time}
        </p>
        <p>{appointment.department}</p>
        <p>Status: {appointment.status}</p>
      </div>

      <select
        value={appointment.status}
        onChange={(e) => onStatusChange(appointment.id, e.target.value)}
        className="border p-2 rounded"
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}
