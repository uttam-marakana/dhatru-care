import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../api/appointmentsApi";
import { auth } from "../../firebase";

const initialState = {
  patientName: "",
  phone: "",
  email: "",
  department: "",
  doctor: "",
  date: "",
  time: "",
  message: "",
};

const departments = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Medicine",
];

export default function AppointmentForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please login to book an appointment.");
      return;
    }

    setLoading(true);

    try {
      await createAppointment({
        ...form,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
        status: "pending",
      });

      setSuccess(true);
      setForm(initialState);

      setTimeout(() => nav("/"), 2000);
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }

    setLoading(false);
  };

  return (
    <div
      className="
      max-w-2xl mx-auto
      bg-(--card)
      border border-(--border)
      p-8 rounded-2xl
      shadow-[0_0_40px_var(--glow-bg)]
      "
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-(--text)">
        Book an Appointment
      </h1>

      {success && (
        <div className="text-(--color-success) text-center mb-4">
          Appointment submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <input
          name="patientName"
          placeholder="Full Name"
          value={form.patientName}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border) text-(--text)"
        />

        {/* Phone */}
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border) text-(--text)"
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border) text-(--text)"
        />

        {/* Department */}
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border) text-(--text)"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>

        {/* Doctor */}
        <input
          name="doctor"
          placeholder="Preferred Doctor"
          value={form.doctor}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border) text-(--text)"
        />

        {/* Date + Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            value={form.date}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-(--surface) border border-(--border) text-(--text)"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-(--surface) border border-(--border) text-(--text)"
          />
        </div>

        {/* Message */}
        <textarea
          name="message"
          placeholder="Additional Notes (optional)"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border) text-(--text)"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-(--color-primary)
          hover:bg-(--color-primary-hover)
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
