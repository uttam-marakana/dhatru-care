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
import DoctorAvailabilityCalendar from "../common/DoctorAvailabilityCalendar";

import { auth } from "../../firebase";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const departmentFromURL = searchParams.get("department");
  const doctorFromURL = searchParams.get("doctor");

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    department: departmentFromURL ?? "",
    doctorId: "",
    date: "",
    time: "",
    message: "",
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [loading, setLoading] = useState(false);

  /* INPUT STYLE */

  const inputStyle = `
  w-full px-4 py-3 rounded-xl
  border border-gray-300 dark:border-white/10
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
  placeholder-gray-500 dark:placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-500
  transition
  `;

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

      if (doctorFromURL) {
        const match = data.find((d) => d.id === doctorFromURL);

        if (match) {
          setForm((prev) => ({
            ...prev,
            doctorId: match.id,
          }));
        }
      }
    };

    loadDoctors();
  }, [form.department]);

  /* SET DOCTOR */

  useEffect(() => {
    const selected = doctors.find((d) => d.id === form.doctorId);
    setDoctor(selected || null);
  }, [form.doctorId, doctors]);

  /* LOAD SLOTS */

  useEffect(() => {
    if (!form.doctorId || !form.date) return;

    const start = doctor?.startHour ?? 9;
    const end = doctor?.endHour ?? 17;
    const interval = doctor?.slotDuration ?? 30;

    const allSlots = generateSlots(start, end, interval);

    const unsubscribe = subscribeDoctorSlots(
      form.doctorId,
      form.date,
      (bookedSlots) => {
        const available = filterAvailableSlots(allSlots, bookedSlots);
        setAvailableSlots(available);
      },
    );

    return () => unsubscribe();
  }, [form.doctorId, form.date, doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" && { doctorId: "", date: "", time: "" }),
      ...(name === "doctorId" && { date: "", time: "" }),
    }));
  };

  const selectDate = (date) => {
    setForm((prev) => ({
      ...prev,
      date,
      time: "",
    }));
  };

  const selectSlot = (slot) => {
    setForm((prev) => ({
      ...prev,
      time: slot,
    }));
  };

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

      navigate("/profile/appointments");
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

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
        placeholder="Phone Number"
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

      <div className="relative">
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
          className={`${inputStyle} appearance-none`}
        >
          <option value="">Select Department</option>

          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          ▼
        </span>
      </div>

      {/* DOCTOR */}

      <div className="relative">
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          required
          className={`${inputStyle} appearance-none`}
        >
          <option value="">Select Doctor</option>

          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          ▼
        </span>
      </div>

      {/* CALENDAR */}

      {doctor && (
        <DoctorAvailabilityCalendar
          selectedDate={form.date}
          onSelect={selectDate}
          doctor={doctor}
        />
      )}

      {/* TIME SLOTS */}

      {form.date && (
        <SlotGrid
          slots={availableSlots}
          selected={form.time}
          onSelect={selectSlot}
        />
      )}

      <textarea
        name="message"
        placeholder="Additional Notes"
        value={form.message}
        onChange={handleChange}
        rows="4"
        className={inputStyle}
      />

      <button
        disabled={loading || !form.time}
        className="
        w-full py-3 rounded-xl
        bg-blue-500 hover:bg-blue-600
        text-white font-medium
        transition
        disabled:opacity-50
        "
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}
