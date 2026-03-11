import { useState } from "react";
import { createPackage, updatePackage } from "../../api/packagesApi";

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
      ? {
          ...initialData,
          includes: initialData.includes?.join(", "),
        }
      : initialState,
  );

  const toArray = (v) => (v ? v.split(",").map((i) => i.trim()) : []);

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      includes: toArray(form.includes),
    };

    if (initialData) await updatePackage(initialData.id, payload);
    else await createPackage(payload);

    alert("Saved");
  };

  const input = "w-full border p-3 rounded";

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      <input
        name="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Package Name"
        className={input}
      />
      <input
        name="price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="Price"
        className={input}
      />
      <input
        name="duration"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
        placeholder="Duration"
        className={input}
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        placeholder="Image URL"
        className={input}
      />

      <input
        name="includes"
        value={form.includes}
        onChange={(e) => setForm({ ...form, includes: e.target.value })}
        placeholder="Includes comma separated"
        className={`${input} md:col-span-2`}
      />

      <textarea
        name="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className={`${input} md:col-span-2`}
        rows={3}
      />

      <label className="flex items-center gap-2 md:col-span-2">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
        />
        Featured Package
      </label>

      <button className="bg-primary text-white py-3 rounded md:col-span-2">
        Save Package
      </button>
    </form>
  );
}
