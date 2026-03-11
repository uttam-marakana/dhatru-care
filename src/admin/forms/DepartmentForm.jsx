import { useState } from "react";
import { createDepartment, updateDepartment } from "../../api/departmentsApi";

const initialState = {
  slug: "",
  name: "",
  icon: "",
  description: "",
  services: "",
  highlights: "",
  bgGradient: "",
};

export default function DepartmentForm({ initialData }) {
  const [form, setForm] = useState(
    initialData
      ? {
          ...initialData,
          services: initialData.services?.join(", "),
          highlights: initialData.highlights?.join(", "),
        }
      : initialState,
  );

  const toArray = (v) =>
    v
      ? v
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
      : [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      services: toArray(form.services),
      highlights: toArray(form.highlights),
    };

    if (initialData) await updateDepartment(initialData.id, payload);
    else await createDepartment(payload);

    alert("Saved");
  };

  const input = "w-full border p-3 rounded";

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className={input}
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className={input}
      />
      <input
        name="icon"
        value={form.icon}
        onChange={handleChange}
        placeholder="Icon Emoji"
        className={input}
      />
      <input
        name="bgGradient"
        value={form.bgGradient}
        onChange={handleChange}
        placeholder="Gradient classes"
        className={input}
      />

      <input
        name="services"
        value={form.services}
        onChange={handleChange}
        placeholder="Services comma separated"
        className={`${input} md:col-span-2`}
      />
      <input
        name="highlights"
        value={form.highlights}
        onChange={handleChange}
        placeholder="Highlights comma separated"
        className={`${input} md:col-span-2`}
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className={`${input} md:col-span-2`}
        rows={4}
      />

      <button className="bg-primary text-white py-3 rounded md:col-span-2">
        Save Department
      </button>
    </form>
  );
}
