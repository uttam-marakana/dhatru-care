import { useState } from "react";
import {
  createDepartment,
  updateDepartment,
} from "../../../api/departmentsApi";

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

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      services: toArray(form.services),
      highlights: toArray(form.highlights),
    };

    try {
      if (initialData) {
        await updateDepartment(initialData.id, payload);
      } else {
        await createDepartment(payload);
      }

      alert("Department saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save department");
    }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="ui-input"
        required
      />

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Department Name"
        className="ui-input"
        required
      />

      <input
        name="icon"
        value={form.icon}
        onChange={handleChange}
        placeholder="Icon (emoji)"
        className="ui-input"
      />

      <input
        name="bgGradient"
        value={form.bgGradient}
        onChange={handleChange}
        placeholder="Background Gradient"
        className="ui-input"
      />

      <input
        name="services"
        value={form.services}
        onChange={handleChange}
        placeholder="Services (comma separated)"
        className="ui-input md:col-span-2"
      />

      <input
        name="highlights"
        value={form.highlights}
        onChange={handleChange}
        placeholder="Highlights (comma separated)"
        className="ui-input md:col-span-2"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={4}
        placeholder="Department Description"
        className="ui-textarea md:col-span-2"
      />

      <button type="submit" className="ui-button md:col-span-2">
        Save Department
      </button>
    </form>
  );
}
