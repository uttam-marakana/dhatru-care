import { useEffect, useState } from "react";
import {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../../api/blogsApi";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", category: "" });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await getBlogPosts();
    setBlogs(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await updateBlogPost(editing.id, form);
    } else {
      await createBlogPost(form);
    }

    setForm({ title: "", slug: "", category: "" });
    setEditing(null);
    load();
  };

  const handleEdit = (blog) => {
    setEditing(blog);
    setForm(blog);
  };

  const handleDelete = async (blog) => {
    if (!confirm("Delete blog?")) return;
    await deleteBlogPost(blog.id);
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Blogs</h1>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          className="border p-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="border p-2"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2">
          {editing ? "Update" : "Create"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-3">{b.title}</td>
              <td>{b.category}</td>

              <td className="space-x-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="bg-yellow-500 text-white px-3 py-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(b)}
                  className="bg-red-600 text-white px-3 py-1"
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
