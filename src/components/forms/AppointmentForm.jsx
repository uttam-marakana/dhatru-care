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
    } catch {
      alert("Booking failed. Please login first.");
    }

    setLoading(false);
  };

  return (
    <div
      className="
      max-w-2xl mx-auto
      bg-[var(--card)]
      border border-[var(--border)]
      p-8 rounded-2xl
      shadow-[0_0_40px_var(--glow-bg)]
      "
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--text)]">
        Book an Appointment
      </h1>

      {success && (
        <div className="text-[var(--color-success)] text-center mb-4">
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
          className="w-full p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
          />
        </div>

        <textarea
          name="message"
          placeholder="Additional Notes"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        />

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-[var(--color-primary)]
          hover:bg-[var(--color-primary-hover)]
          text-white
          p-3 rounded-xl
          shadow-[0_0_20px_var(--glow-soft)]
          transition
          "
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}
