import { useState } from "react";
import { createBlogPost } from "../../api/blogsApi";

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

export default function BlogForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // safe array converter
  const normalizeArray = (value) =>
    value
      ? value
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
      : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        tags: normalizeArray(form.tags),
      };

      // basic validation
      if (!payload.slug || !payload.title)
        throw new Error("Required fields missing");

      await createBlogPost(payload);

      alert("Blog added successfully!");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setLoading(false);
  };

  const input =
    "w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg p-3";

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-8">
        <h2 className="text-2xl font-bold mb-6">Add Blog Post</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug (heart-health-guide)"
            className={input}
            required
          />

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className={input}
            required
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
            placeholder="February 15, 2025"
            className={input}
          />

          <input
            name="readTime"
            value={form.readTime}
            onChange={handleChange}
            placeholder="8 min"
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
            className={`md:col-span-2 ${input}`}
          />

          <input
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Short excerpt (100–200 chars)"
            className={`md:col-span-2 ${input}`}
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Full blog content (Markdown or HTML)"
            className={`md:col-span-2 ${input}`}
            rows={6}
          />

          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="heart, prevention, wellness"
            className={`md:col-span-2 ${input}`}
          />

          <button
            disabled={loading}
            className="md:col-span-2 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Uploading..." : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
