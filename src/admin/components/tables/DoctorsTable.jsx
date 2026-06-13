export default function DoctorsTable({ doctors, onEdit, onDelete }) {
  return (
    <div className="glass rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-sm">
          <thead className="bg-[var(--card)] border-b border-[var(--border)]">
            <tr className="text-left text-[var(--text-secondary)]">
              <th className="p-6 w-[22%] font-medium">Name</th>

              <th className="p-6 w-[22%] font-medium">Specialty</th>

              <th className="p-6 w-[24%] font-medium">Department</th>

              <th className="p-6 w-[12%] font-medium">Experience</th>

              <th className="p-6 w-[20%] font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="
                  hover:bg-[var(--card)]
                  transition-colors
                  duration-200
                "
              >
                <td className="p-6 font-medium">{doctor.name}</td>

                <td className="p-6">{doctor.specialty}</td>

                <td className="p-6 truncate" title={doctor.departmentId}>
                  {doctor.departmentId}
                </td>

                <td className="p-6">{doctor.experience} yrs</td>

                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onEdit(doctor)}
                      className="
                        text-[var(--color-primary)]
                        hover:underline
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(doctor.id)}
                      className="
                        text-[var(--color-error)]
                        hover:underline
                      "
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
