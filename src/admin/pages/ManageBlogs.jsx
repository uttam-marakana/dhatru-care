import { useEffect, useState, useMemo } from "react";

import { getBlogPosts, deleteBlogPost } from "../../api/blogsApi";

import BlogsTable from "../components/tables/BlogsTable";
import BlogForm from "../components/forms/BlogForm";

import AdminHeader from "../components/layout/AdminHeader";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

const PAGE_SIZE = 10;

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteBlog, setDeleteBlog] = useState(null);

  const [page, setPage] = useState(1);

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

  /* PAGINATION */

  const totalPages = Math.ceil(blogs.length / PAGE_SIZE);

  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return blogs.slice(start, start + PAGE_SIZE);
  }, [blogs, page]);

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
        blogs={paginatedBlogs}
        onEdit={(b) => setEditingBlog(b)}
        onDelete={(b) => setDeleteBlog(b)}
      />

      {/* PAGINATION */}

      {blogs.length > PAGE_SIZE && (
        <div className="flex justify-end gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg"
          >
            Previous
          </button>

          <span className="text-[var(--muted)]">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg"
          >
            Next
          </button>
        </div>
      )}

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
