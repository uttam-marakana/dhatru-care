import { useState } from "react";
import { createPackage, updatePackage } from "../../../api/packagesApi";

const initialState = {
  name: "",
  description: "",
  price: "",
  duration: "",
  includes: "",
  imageUrl: "",
  isFeatured: false,
};

export default function PackageForm({ initialData }) {
  const [form, setForm] = useState(
    initialData
      ? { ...initialData, includes: initialData.includes?.join(", ") }
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
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      includes: toArray(form.includes),
    };

    try {
      if (initialData) {
        await updatePackage(initialData.id, payload);
      } else {
        await createPackage(payload);
      }

      alert("Package saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save package");
    }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Package Name"
        className="ui-input"
        required
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="ui-input"
        required
      />

      <input
        name="duration"
        value={form.duration}
        onChange={handleChange}
        placeholder="Duration"
        className="ui-input"
      />

      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="ui-input"
      />

      <input
        name="includes"
        value={form.includes}
        onChange={handleChange}
        placeholder="Includes (comma separated)"
        className="ui-input md:col-span-2"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={3}
        placeholder="Package Description"
        className="ui-textarea md:col-span-2"
      />

      <label className="flex items-center gap-2 md:col-span-2">
        <input
          type="checkbox"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={handleChange}
        />
        Featured Package
      </label>

      <button type="submit" className="ui-button md:col-span-2">
        Save Package
      </button>
    </form>
  );
}
