import { useState } from "react";
import { createPackage } from "../../api/packagesApi";

const initialState = {
  name: "",
  description: "",
  price: "",
  duration: "",
  includes: "",
  imageUrl: "",
  isFeatured: false,
};

export default function PackageForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

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
        price: Number(form.price) || 0,
        includes: normalizeArray(form.includes),
      };

      // basic validation
      if (!payload.name || !payload.price)
        throw new Error("Required fields missing");

      await createPackage(payload);

      alert("Package added successfully!");
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
        <h2 className="text-2xl font-bold mb-6">Add Package</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Package Name"
            className={input}
            required
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className={input}
            required
          />

          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (e.g. 3 Months)"
            className={input}
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className={input}
          />

          <input
            name="includes"
            value={form.includes}
            onChange={handleChange}
            placeholder="ECG, Consultation, Blood Test"
            className={`md:col-span-2 ${input}`}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Package Description"
            className={`md:col-span-2 ${input}`}
            rows={4}
          />

          <label className="md:col-span-2 flex items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Featured Package (show on homepage)
          </label>

          <button
            disabled={loading}
            className="md:col-span-2 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Uploading..." : "Add Package"}
          </button>
        </form>
      </div>
    </div>
  );
}
