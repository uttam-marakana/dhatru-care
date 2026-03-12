export default function BlogsTable({ blogs, onEdit, onDelete }) {
  return (
    <div className="glass overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr className="text-left text-[var(--text-secondary)]">
            <th className="p-4">Title</th>
            <th className="p-4">Author</th>
            <th className="p-4">Category</th>
            <th className="p-4">Date</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog.id}
              className="border-b border-[var(--border)] hover:bg-[var(--card)]"
            >
              <td className="p-4 font-medium">{blog.title}</td>

              <td className="p-4">{blog.author}</td>

              <td className="p-4">{blog.category}</td>

              <td className="p-4">{blog.date}</td>

              <td className="p-4 flex gap-3">
                <button
                  onClick={() => onEdit(blog)}
                  className="text-[var(--color-primary)]"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(blog.id)}
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
