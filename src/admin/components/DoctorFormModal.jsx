import { useState } from "react";

import { createDoctor, updateDoctor } from "../../api/doctorsApi";

export default function DoctorFormModal({ doctor, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: doctor?.name || "",
    specialty: doctor?.specialty || "",
    departmentId: doctor?.departmentId || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (doctor) {
      await updateDoctor(doctor.id, form);
    } else {
      await createDoctor(form);
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 w-[400px] rounded">
        <h2 className="text-lg font-semibold mb-4">
          {doctor ? "Edit Doctor" : "Add Doctor"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Doctor Name"
            className="w-full border p-2"
          />

          <input
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            placeholder="Specialty"
            className="w-full border p-2"
          />

          <input
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
            placeholder="Department ID"
            className="w-full border p-2"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border"
            >
              Cancel
            </button>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
