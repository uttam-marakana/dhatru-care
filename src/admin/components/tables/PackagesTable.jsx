export default function PackagesTable({ packages, onEdit, onDelete }) {
  return (
    <div className="glass overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr className="text-left text-[var(--text-secondary)]">
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Duration</th>
            <th className="p-4">Featured</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {packages.map((pkg) => (
            <tr
              key={pkg.id}
              className="border-b border-[var(--border)] hover:bg-[var(--card)]"
            >
              <td className="p-4 font-medium">{pkg.name}</td>

              <td className="p-4">₹{pkg.price}</td>

              <td className="p-4">{pkg.duration}</td>

              <td className="p-4">{pkg.isFeatured ? "Yes" : "No"}</td>

              <td className="p-4 flex gap-3">
                <button
                  onClick={() => onEdit(pkg)}
                  className="text-[var(--color-primary)]"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(pkg.id)}
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
