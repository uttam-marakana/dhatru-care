import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../api/appointmentsApi";
import { auth } from "../../firebase";

const initialState = {
  patientName: "",
  phone: "",
  email: "",
  department: "",
  date: "",
  time: "",
  message: "",
};

export default function AppointmentForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAppointment({
        ...form,
        userId: auth.currentUser?.uid || null,
      });

      setSuccess(true);
      setForm(initialState);
      setTimeout(() => nav("/"), 2000);
    } catch (err) {
      alert("Booking failed. Please login first.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Book an Appointment
      </h1>

      {success && (
        <div className="text-green-600 text-center mb-4">
          Appointment submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="patientName"
          placeholder="Full Name"
          value={form.patientName}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
        </div>

        <textarea
          name="message"
          placeholder="Additional Notes"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white p-3 rounded hover:opacity-90 transition"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}
