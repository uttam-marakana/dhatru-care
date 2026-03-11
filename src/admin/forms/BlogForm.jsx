import { useState } from "react";
import { createBlogPost, updateBlogPost } from "../../api/blogsApi";

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
      ? {
          ...initialData,
          tags: initialData.tags?.join(", "),
        }
      : initialState,
  );

  const toArray = (v) => (v ? v.split(",").map((i) => i.trim()) : []);

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

  const input = "w-full border rounded p-3";

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      <input
        name="slug"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        placeholder="Slug"
        className={input}
      />
      <input
        name="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className={input}
      />
      <input
        name="author"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        placeholder="Author"
        className={input}
      />
      <input
        name="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        placeholder="Date"
        className={input}
      />
      <input
        name="readTime"
        value={form.readTime}
        onChange={(e) => setForm({ ...form, readTime: e.target.value })}
        placeholder="Read Time"
        className={input}
      />
      <input
        name="category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        placeholder="Category"
        className={input}
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        placeholder="Image URL"
        className={`${input} md:col-span-2`}
      />
      <input
        name="tags"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
        placeholder="Tags comma separated"
        className={`${input} md:col-span-2`}
      />

      <textarea
        name="excerpt"
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        className={`${input} md:col-span-2`}
        rows={2}
      />

      <textarea
        name="content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className={`${input} md:col-span-2`}
        rows={6}
      />

      <button className="bg-primary text-white py-3 rounded md:col-span-2">
        Save Blog
      </button>
    </form>
  );
}
