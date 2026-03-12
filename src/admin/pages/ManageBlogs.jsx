import { useEffect, useState } from "react";

import { getBlogPosts, deleteBlogPost } from "../../api/blogsApi";

import BlogsTable from "../components/tables/BlogsTable";
import BlogForm from "../components/forms/BlogForm";

import AdminHeader from "../components/layout/AdminHeader";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteBlog, setDeleteBlog] = useState(null);

  const load = async () => {
    const data = await getBlogPosts();
    setBlogs(data);
  };

  useEffect(() => {
    load();
  }, []);

  const confirmDelete = async () => {
    await deleteBlogPost(deleteBlog.id);
    setDeleteBlog(null);
    load();
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Manage Blogs"
        description="Create and manage blog posts"
      />

      {/* FORM */}

      <div className="glass p-6">
        <BlogForm initialData={editingBlog} />
      </div>

      {/* TABLE */}

      <BlogsTable
        blogs={blogs}
        onEdit={(b) => setEditingBlog(b)}
        onDelete={(b) => setDeleteBlog(b)}
      />

      {/* DELETE MODAL */}

      <ConfirmDeleteModal
        open={!!deleteBlog}
        title="Delete Blog"
        description="Are you sure you want to delete this blog?"
        onConfirm={confirmDelete}
        onClose={() => setDeleteBlog(null)}
      />
    </div>
  );
}
