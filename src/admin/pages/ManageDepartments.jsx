import { useEffect, useState } from "react";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../api/departmentsApi";

export default function ManageDepartments() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", slug: "" });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await getDepartments();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await updateDepartment(editing.id, form);
    } else {
      await createDepartment(form);
    }

    setForm({ name: "", type: "", slug: "" });
    setEditing(null);
    load();
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm(item);
  };

  const handleDelete = async (item) => {
    if (!confirm("Delete department?")) return;
    await deleteDepartment(item.id);
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Departments</h1>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          className="border p-2"
          placeholder="Department Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2"
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2">
          {editing ? "Update" : "Create"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((d) => (
            <tr key={d.id} className="border-t">
              <td className="p-3">{d.name}</td>
              <td>{d.type}</td>

              <td className="space-x-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="bg-yellow-500 text-white px-3 py-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(d)}
                  className="bg-red-600 text-white px-3 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
