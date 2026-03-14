import { useEffect, useState } from "react";
import { notifySuccess, notifyError } from "../../utils/toast";

import { getBlogPosts, deleteBlogPost } from "../../api/blogsApi";

import AdminTable from "../components/common/AdminTable";
import BlogFormModal from "../components/modals/BlogFormModal";
import AdminHeader from "../components/layout/AdminHeader";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const load = async () => {
    const data = await getBlogPosts();
    setBlogs(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (blog) => {
    if (!confirm("Delete blog?")) return;

    try {
      await deleteBlogPost(blog.id);
      notifySuccess("Blog deleted");
      load();
    } catch {
      notifyError("Failed to delete blog");
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Blogs"
        action={
          <button
            onClick={() => {
              setSelectedBlog(null);
              setModal(true);
            }}
            className="px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg"
          >
            Add Blog
          </button>
        }
      />

      <AdminTable
        data={blogs}
        columns={["Title", "Category", "Author", "Date", "Actions"]}
        renderRow={(blog) => (
          <tr
            key={blog.id}
            className="border-b border-[var(--border)] hover:bg-[var(--card)]"
          >
            <td className="p-4 font-medium">{blog.title}</td>
            <td className="p-4">{blog.category}</td>
            <td className="p-4">{blog.author}</td>
            <td className="p-4">{blog.date}</td>

            <td className="p-4 flex gap-3">
              <button
                onClick={() => {
                  setSelectedBlog(blog);
                  setModal(true);
                }}
                className="text-[var(--color-primary)]"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog)}
                className="text-[var(--color-error)]"
              >
                Delete
              </button>
            </td>
          </tr>
        )}
      />

      {modal && (
        <BlogFormModal
          open={modal}
          blog={selectedBlog}
          onClose={() => setModal(false)}
          onSaved={load}
        />
      )}
    </div>
  );
}
