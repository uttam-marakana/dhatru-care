import { useState } from "react";
import { createBlogPost, updateBlogPost } from "../../../api/blogsApi";

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

export default function BlogForm({ initialData }) {
  const [form, setForm] = useState(
    initialData
      ? { ...initialData, tags: initialData.tags?.join(", ") }
      : initialState,
  );

  const toArray = (v) =>
    v
      ? v
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
      : [];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: toArray(form.tags),
    };

    if (initialData) await updateBlogPost(initialData.id, payload);
    else await createBlogPost(payload);

    alert("Saved");
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
        placeholder="Tags comma separated"
        className={`${input} md:col-span-2`}
      />

      <textarea
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
        rows={2}
        className={`${input} md:col-span-2`}
      />

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        rows={6}
        className={`${input} md:col-span-2`}
      />

      <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg md:col-span-2">
        Save Blog
      </button>
    </form>
  );
}
