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

  const departmentParam = searchParams.get("department");
  const doctorParam = searchParams.get("doctor");

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    department: "",
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

  const inputStyle = `
  w-full p-3 rounded-lg
  border border-gray-200 dark:border-white/10
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
  focus:ring-2 focus:ring-blue-500
  outline-none
  `;

  /* LOAD DEPARTMENTS */

  useEffect(() => {
    const loadDepartments = async () => {
      const data = await getDepartments();
      setDepartments(data);

      if (departmentParam) {
        setForm((prev) => ({
          ...prev,
          department: departmentParam,
        }));

        setStep(2);
      }
    };

    loadDepartments();
  }, []);

  /* LOAD DOCTORS */

  useEffect(() => {
    if (!form.department) {
      setDoctors([]);
      return;
    }

    const loadDoctors = async () => {
      const data = await getDoctorsByDepartment(form.department);
      setDoctors(data);

      if (doctorParam) {
        const found = data.find((d) => d.id === doctorParam);

        if (found) {
          setForm((prev) => ({
            ...prev,
            doctorId: found.id,
          }));

          setStep(3);
        }
      }
    };

    loadDoctors();
  }, [form.department]);

  /* SET SELECTED DOCTOR */

  useEffect(() => {
    const selected = doctors.find((d) => d.id === form.doctorId);
    setDoctor(selected || null);
  }, [form.doctorId, doctors]);

  /* LOAD AVAILABLE SLOTS */

  useEffect(() => {
    if (!form.doctorId || !form.date) return;

    const start = doctor?.startHour ?? 9;
    const end = doctor?.endHour ?? 17;
    const interval = doctor?.slotDuration ?? 30;

    const allSlots = generateSlots(start, end, interval);

    const unsubscribe = subscribeDoctorSlots(
      form.doctorId,
      form.date,
      (booked) => {
        const available = filterAvailableSlots(allSlots, booked);
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

      ...(name === "department" && {
        doctorId: "",
        date: "",
        time: "",
      }),

      ...(name === "doctorId" && {
        date: "",
        time: "",
      }),
    }));
  };

  const selectDoctor = (doc) => {
    setForm((prev) => ({
      ...prev,
      doctorId: doc.id,
    }));

    setStep(3);
  };

  const selectDate = (date) => {
    setForm((prev) => ({
      ...prev,
      date,
      time: "",
    }));

    setStep(4);
  };

  const selectSlot = (slot) => {
    setForm((prev) => ({
      ...prev,
      time: slot,
    }));

    setStep(5);
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PROGRESS BAR */}

      <div className="flex justify-between text-sm">
        <span className={step >= 1 ? "text-blue-500 font-semibold" : ""}>
          Department
        </span>
        <span className={step >= 2 ? "text-blue-500 font-semibold" : ""}>
          Doctor
        </span>
        <span className={step >= 3 ? "text-blue-500 font-semibold" : ""}>
          Date
        </span>
        <span className={step >= 4 ? "text-blue-500 font-semibold" : ""}>
          Time
        </span>
        <span className={step >= 5 ? "text-blue-500 font-semibold" : ""}>
          Details
        </span>
      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <select
          name="department"
          value={form.department}
          onChange={(e) => {
            handleChange(e);
            setStep(2);
          }}
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
      )}

      {/* STEP 2 DOCTOR CARDS */}

      {step === 2 && (
        <div className="grid grid-cols-2 gap-3">
          {doctors.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => selectDoctor(doc)}
              className="
border border-gray-200 dark:border-white/10
p-4 rounded-lg
text-left
hover:border-blue-500
transition
"
            >
              <div className="font-semibold">{doc.name}</div>

              <div className="text-sm text-gray-500">{doc.specialty}</div>
            </button>
          ))}
        </div>
      )}

      {/* STEP 3 CALENDAR */}

      {step >= 3 && doctor && (
        <DoctorAvailabilityCalendar
          selectedDate={form.date}
          onSelect={selectDate}
          doctor={doctor}
        />
      )}

      {/* STEP 4 SLOTS */}

      {step >= 4 && (
        <SlotGrid
          slots={availableSlots}
          selected={form.time}
          onSelect={selectSlot}
        />
      )}

      {/* STEP 5 PATIENT INFO */}

      {step >= 5 && (
        <>
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
w-full py-3 rounded-lg
bg-blue-500 hover:bg-blue-600
text-white font-medium
disabled:opacity-50
"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </>
      )}
    </form>
  );
}
