import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAppointment,
  subscribeDoctorSlots,
} from "../../api/appointmentsApi";
import { generateSlots, filterAvailableSlots } from "../../utils/generateSlots";
import { auth } from "../../firebase";

const initialState = {
  patientName: "",
  phone: "",
  email: "",
  department: "",
  doctorId: "",
  date: "",
  time: "",
  message: "",
};

export default function AppointmentForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [slots, setSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* SLOT GENERATION */

  useEffect(() => {
    if (!form.doctorId || !form.date) return;

    const allSlots = generateSlots(9, 17, 30);

    const unsubscribe = subscribeDoctorSlots(
      form.doctorId,
      form.date,
      (bookedSlots) => {
        const available = filterAvailableSlots(allSlots, bookedSlots);

        setSlots(allSlots);
        setAvailableSlots(available);
      },
    );

    return () => unsubscribe();
  }, [form.doctorId, form.date]);

  /* SUBMIT */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      await createAppointment({
        ...form,
        userId: user.uid,
      });

      alert("Appointment booked!");

      setForm(initialState);

      navigate("/profile/appointments");
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="patientName"
        placeholder="Full Name"
        value={form.patientName}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
      />

      <input
        name="doctorId"
        placeholder="Doctor ID"
        value={form.doctorId}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      {/* SLOT SELECTOR */}

      <select name="time" value={form.time} onChange={handleChange} required>
        <option value="">Select Time Slot</option>

        {availableSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>

      <textarea
        name="message"
        placeholder="Additional Notes"
        value={form.message}
        onChange={handleChange}
      />

      <button disabled={loading}>
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}
