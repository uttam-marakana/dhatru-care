import { useState, useEffect } from "react";

import {
  createDepartment,
  updateDepartment,
} from "../../../api/departmentsApi";

import { notifyPromise } from "../../../utils/toast";

const initialState = {
  slug: "",
  name: "",
  icon: "",
  description: "",
  services: "",
  highlights: "",
  bgGradient: "",
};

export default function DepartmentForm({ initialData, onSaved }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        services: initialData.services?.join(", ") || "",
        highlights: initialData.highlights?.join(", ") || "",
      });
    } else {
      setForm(initialState);
    }
  }, [initialData]);

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
        await notifyPromise(updateDepartment(initialData.id, payload), {
          loading: "Updating department...",
          success: "Department updated successfully",
          error: "Failed to update department",
        });
      } else {
        await notifyPromise(createDepartment(payload), {
          loading: "Creating department...",
          success: "Department created successfully",
          error: "Failed to create department",
        });
      }

      onSaved?.();
      setForm(initialState);
    } catch (err) {
      console.error(err);
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
