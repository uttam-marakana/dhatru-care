import { useState } from "react";
import { createAppointment } from "../../api/appointmentsApi";

const initialState = {
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
      const cleaned = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v.trim()]),
      );

      await createAppointment(cleaned);

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
      {Object.keys(initialState).map((field) =>
        field === "message" ? (
          <textarea
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
          />
        ) : (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            required={field !== "department" && field !== "message"}
          />
        ),
      )}

      <button disabled={loading}>
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}
