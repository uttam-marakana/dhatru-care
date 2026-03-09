import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  createAppointment,
  subscribeDoctorSlots,
} from "../../api/appointmentsApi";

import { getDepartments } from "../../api/departmentsApi";
import { getDoctorsByDepartment } from "../../api/doctorsApi";

import { generateSlots, filterAvailableSlots } from "../../utils/generateSlots";

import SlotGrid from "../common/SlotGrid";

import { auth } from "../../firebase";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* READ QUERY PARAMS */

  const departmentFromURL = searchParams.get("department");
  const doctorFromURL = searchParams.get("doctor");

  /* FORM STATE */

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    department: departmentFromURL || "",
    doctorId: doctorFromURL || "",
    date: "",
    time: "",
    message: "",
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [loading, setLoading] = useState(false);

  /* LOAD DEPARTMENTS */

  useEffect(() => {
    const load = async () => {
      const data = await getDepartments();
      setDepartments(data);
    };

    load();
  }, []);

  /* LOAD DOCTORS */

  useEffect(() => {
    if (!form.department) return;

    const loadDoctors = async () => {
      const data = await getDoctorsByDepartment(form.department);
      setDoctors(data);
    };

    loadDoctors();
  }, [form.department]);

  /* LOAD AVAILABLE SLOTS */

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

  /* INPUT CHANGE */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" && { doctorId: "", time: "" }),
    }));
  };

  /* SELECT SLOT */

  const selectSlot = (slot) => {
    setForm((prev) => ({ ...prev, time: slot }));
  };

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

      alert("Appointment booked successfully!");

      setForm({
        patientName: "",
        phone: "",
        email: "",
        department: "",
        doctorId: "",
        date: "",
        time: "",
        message: "",
      });

      navigate("/profile/appointments");
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  const inputStyle = `
  w-full p-3 rounded-lg
  border border-gray-200 dark:border-white/10
  bg-white dark:bg-white/5
  text-gray-900 dark:text-white
  focus:ring-2 focus:ring-blue-500
  outline-none
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

      {/* DEPARTMENT */}

      <select
        name="department"
        value={form.department}
        onChange={handleChange}
        required
        className={inputStyle}
      >
        <option value="">Select Department</option>

        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {/* DOCTOR */}

      <select
        name="doctorId"
        value={form.doctorId}
        onChange={handleChange}
        required
        className={inputStyle}
      >
        <option value="">Select Doctor</option>

        {doctors.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        min={new date().toISOString().split("T")[0]}
        value={form.date}
        onChange={handleChange}
        required
        className={inputStyle}
      />

      {/* SLOT GRID */}

      <SlotGrid
        slots={availableSlots}
        selected={form.time}
        onSelect={selectSlot}
      />

      <textarea
        name="message"
        placeholder="Additional Notes"
        value={form.message}
        onChange={handleChange}
        rows="4"
        className={inputStyle}
      />

      <button
        disabled={loading}
        className="
        w-full py-3 rounded-lg
        bg-blue-500 hover:bg-blue-600
        text-white font-medium
        shadow-blue-500/30
        "
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}
