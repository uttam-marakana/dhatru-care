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
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

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
      navigate("/login");
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

  const inputStyle = `
  w-full
  p-3
  rounded-lg
  border border-gray-200
  dark:border-white/10
  bg-white
  dark:bg-white/5
  text-gray-900
  dark:text-white
  placeholder-gray-500
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  transition
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        name="patientName"
        placeholder="Full Name"
        value={form.patientName}
        onChange={handleChange}
        required
        className={inputStyle}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
        className={inputStyle}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className={inputStyle}
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
        className={inputStyle}
      />

      <input
        name="doctorId"
        placeholder="Doctor ID"
        value={form.doctorId}
        onChange={handleChange}
        required
        className={inputStyle}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className={inputStyle}
      />

      {/* SLOT */}

      <select
        name="time"
        value={form.time}
        onChange={handleChange}
        required
        className={inputStyle}
      >
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
        rows="4"
        className={inputStyle}
      />

      {/* BUTTON */}

      <button
        disabled={loading}
        className="
        w-full
        py-3
        rounded-lg
        font-medium
        bg-blue-500
        hover:bg-blue-600
        text-white
        transition
        shadow-blue-500/30
        "
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}
