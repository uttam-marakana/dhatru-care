import { useState } from "react";
import { createAppointment } from "../../api/appointmentsApi";

const initialState = {
  userId: "",
  patientName: "",
  phone: "",
  email: "",
  doctorId: "",
  department: "",
  date: "",
  time: "",
  message: "",
};

export default function AppointmentForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAppointment(form);
      alert("Appointment booked!");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
      <input
        name="patientName"
        placeholder="Patient Name"
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="doctorId"
        placeholder="Doctor ID"
        onChange={handleChange}
        required
      />
      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
      />
      <input type="date" name="date" onChange={handleChange} required />
      <input
        name="time"
        placeholder="10:30 AM"
        onChange={handleChange}
        required
      />
      <textarea name="message" placeholder="Message" onChange={handleChange} />

      <button disabled={loading}>
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}
