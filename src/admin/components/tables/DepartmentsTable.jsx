export default function DepartmentsTable({ departments, onEdit, onDelete }) {
  return (
    <div className="glass overflow-x-auto">
      <table className="min-w-full table-fixed text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr className="text-left text-[var(--text-secondary)]">
            <th className="p-4">Name</th>
            <th className="p-4">Slug</th>
            <th className="p-4">Icon</th>
            <th className="p-4 w-40">Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id} className="border-b border-[var(--border)] hover:bg-[var(--card)]">
              <td className="p-4 font-medium">{dept.name}</td>

              <td className="p-4">{dept.slug}</td>

              <td className="p-4">{dept.icon}</td>

              <td className="p-4">
                <div className="flex gap-3">
                  <button onClick={() => onEdit(pkg)} className="text-[var(--color-primary)]">
                    Edit
                  </button>

                  <button onClick={() => onDelete(pkg.id)} className="text-[var(--color-error)]">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
