import { useState } from "react";
import { createDepartment } from "../../api/departmentsApi";

const initialState = {
  slug: "",
  name: "",
  icon: "",
  description: "",
  services: "",
  highlights: "",
  doctorsCount: "0",
  bgGradient: "",
};

export default function DepartmentForm() {
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
        services: normalizeArray(form.services),
        highlights: normalizeArray(form.highlights),
        doctorsCount: Number(form.doctorsCount) || 0,
      };

      // basic validation
      if (!payload.slug || !payload.name)
        throw new Error("Required fields missing");

      await createDepartment(payload);

      alert("Department added successfully!");
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
        <h2 className="text-2xl font-bold mb-6">Add Department</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug (cardiology)"
            className={input}
            required
          />

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Department Name"
            className={input}
            required
          />

          <input
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder="Icon (❤️)"
            className={input}
          />

          <input
            name="doctorsCount"
            value={form.doctorsCount}
            onChange={handleChange}
            placeholder="Doctors Count"
            className={input}
          />

          <input
            name="services"
            value={form.services}
            onChange={handleChange}
            placeholder="ECG, Angioplasty"
            className={input}
          />

          <input
            name="highlights"
            value={form.highlights}
            onChange={handleChange}
            placeholder="24x7 ICU, Stroke Care"
            className={input}
          />

          <input
            name="bgGradient"
            value={form.bgGradient}
            onChange={handleChange}
            placeholder="Tailwind Gradient"
            className={input}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Department Description"
            className={`md:col-span-2 ${input}`}
            rows={4}
          />

          <button
            disabled={loading}
            className="md:col-span-2 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Uploading..." : "Add Department"}
          </button>
        </form>
      </div>
    </div>
  );
}
