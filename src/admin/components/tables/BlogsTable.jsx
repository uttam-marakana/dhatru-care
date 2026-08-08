import Button from "../../../components/common/Button";

export default function BlogsTable({ blogs, onEdit, onDelete }) {
  return (
    <div className="glass rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-sm">
          <thead className="bg-[var(--card)] border-b border-[var(--border)]">
            <tr className="text-left text-[var(--text-secondary)]">
              <th className="p-6 font-medium">Title</th>
              <th className="p-6 font-medium">Author</th>
              <th className="p-6 font-medium">Category</th>
              <th className="p-6 font-medium">Date</th>
              <th className="p-6 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="hover:bg-[var(--card)] transition-colors duration-200"
              >
                <td className="p-6 font-medium max-w-[300px] truncate">
                  {blog.title}
                </td>

                <td className="p-6">{blog.author}</td>

                <td className="p-6">
<span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-medium">
                    {blog.category}
                  </span>
                </td>

                <td className="p-6 text-[var(--muted)]">{blog.date}</td>

                <td className="p-6">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(blog)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(blog.id)}
                    >
                      Delete
                    </Button>
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
