import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../api/appointmentsApi";
import { auth } from "../../firebase";

const initialState = {
  patientName: "",
  phone: "",
  email: "",
  department: "",
  doctorID: "",
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.patientName) return "Patient name required";
    if (!form.phone) return "Phone number required";
    if (!form.email) return "Email required";
    if (!form.department) return "Select department";
    if (!form.doctorID) return "Select doctor";
    if (!form.date) return "Select appointment date";
    if (!form.time) return "Select appointment time";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user?.uid) {
      alert("Please login to book an appointment.");
      return;
    }

    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);

    try {
      const appointmentData = {
        patientName: form.patientName,
        phone: form.phone,
        email: form.email,
        department: form.department,
        doctorID: form.doctorID,
        date: form.date,
        time: form.time,
        message: form.message,
        userId: user.uid,
      };

      await createAppointment(appointmentData);

      setSuccess(true);
      setForm(initialState);

      setTimeout(() => {
        navigate("/profile/appointments");
      }, 1500);
    } catch (err) {
      console.error("Appointment booking error:", err);
      alert(err.message || "Booking failed");
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
        <div className="text-complete text-center mb-4">
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
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border)"
        />

        {/* Phone */}
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border)"
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border)"
        />

        {/* Department */}
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border)"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Doctor ID */}
        <input
          name="doctorID"
          placeholder="Doctor ID (example: doc_1)"
          value={form.doctorID}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border)"
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
            className="p-3 rounded-lg bg-(--surface) border border-(--border)"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-(--surface) border border-(--border)"
          />
        </div>

        {/* Message */}
        <textarea
          name="message"
          placeholder="Additional Notes"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-(--surface) border border-(--border)"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-primary
          hover:bg-primary-hover
          text-white
          p-3 rounded-xl
          transition
          "
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}
