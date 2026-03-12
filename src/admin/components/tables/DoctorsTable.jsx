export default function DoctorsTable({ doctors, onEdit, onDelete }) {
  return (
    <div className="glass overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr className="text-left text-[var(--text-secondary)]">
            <th className="p-4">Name</th>
            <th className="p-4">Specialty</th>
            <th className="p-4">Department</th>
            <th className="p-4">Experience</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor) => (
            <tr
              key={doctor.id}
              className="border-b border-[var(--border)] hover:bg-[var(--card)]"
            >
              <td className="p-4 font-medium">{doctor.name}</td>

              <td className="p-4">{doctor.specialty}</td>

              <td className="p-4">{doctor.departmentId}</td>

              <td className="p-4">{doctor.experience} yrs</td>

              <td className="p-4 flex gap-3">
                <button
                  onClick={() => onEdit(doctor)}
                  className="text-[var(--color-primary)]"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(doctor.id)}
                  className="text-[var(--color-error)]"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
