import { useState, useEffect } from "react";
import { createBlogPost, updateBlogPost } from "../../../api/blogsApi";

import { notifyPromise } from "../../../utils/toast";

const initialState = {
  slug: "",
  title: "",
  content: "",
  excerpt: "",
  author: "",
  date: "",
  readTime: "",
  imageUrl: "",
  category: "",
  tags: "",
};

export default function BlogForm({ initialData, onSaved, onClose }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  /* --- LOAD DATA FOR EDIT ----------- */

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
      });
    } else {
      setForm(initialState);
    }
  }, [initialData]);

  /* --- INPUT HANDLER ----------- */

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* --- HELPERS ----------- */

  const toArray = (v) =>
    v
      ? v
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
      : [];

  /* --- SUBMIT ----------- */

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      tags: toArray(form.tags),
    };

    try {
      if (initialData) {
        await notifyPromise(updateBlogPost(initialData.id, payload), {
          loading: "Updating blog...",
          success: "Blog updated successfully",
          error: "Failed to update blog",
        });
      } else {
        await notifyPromise(createBlogPost(payload), {
          loading: "Creating blog...",
          success: "Blog created successfully",
          error: "Failed to create blog",
        });
      }

      onSaved?.();
      onClose?.();
      setForm(initialState);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const input =
    "w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text)]";

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className={input}
      />

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className={input}
      />

      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        className={input}
      />

      <input
        name="date"
        value={form.date}
        onChange={handleChange}
        placeholder="Date"
        className={input}
      />

      <input
        name="readTime"
        value={form.readTime}
        onChange={handleChange}
        placeholder="Read Time"
        className={input}
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className={input}
      />

      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className={`${input} md:col-span-2`}
      />

      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className={`${input} md:col-span-2`}
      />

      <textarea
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
        rows={2}
        placeholder="Short excerpt"
        className={`${input} md:col-span-2`}
      />

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        rows={6}
        placeholder="Blog content"
        className={`${input} md:col-span-2`}
      />

      <button
        disabled={loading}
        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg md:col-span-2"
      >
        {loading ? "Saving..." : "Save Blog"}
      </button>
    </form>
  );
}
