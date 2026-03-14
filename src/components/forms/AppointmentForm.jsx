import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  createAppointment,
  subscribeDoctorSlots,
} from "../../api/appointmentsApi";

import { getAllDepartments } from "../../api/departmentsApi";
import { getDoctorsByDepartment } from "../../api/doctorsApi";

import {
  generateSlots,
  filterAvailableSlots,
  isDoctorWorkingDay,
} from "../../utils/generateSlots";

import SlotGrid from "../common/SlotGrid";
import DoctorAvailabilityCalendar from "../common/DoctorAvailabilityCalendar";

import { auth } from "../../firebase";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const departmentParam = searchParams.get("department");
  const doctorParam = searchParams.get("doctor");

  const fromDepartmentPage = !!departmentParam && !doctorParam;
  const fromDoctorPage = !!doctorParam;

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

  /* ---------------- LOAD DEPARTMENTS ---------------- */

  useEffect(() => {
    const loadDepartments = async () => {
      const data = await getAllDepartments();
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

  /* ---------------- LOAD DOCTORS ---------------- */

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
            department: found.departmentId,
            doctorId: found.id,
          }));

          setStep(3);
        }
      }
    };

    loadDoctors();
  }, [form.department]);

  /* ---------------- SELECTED DOCTOR ---------------- */

  useEffect(() => {
    const selected = doctors.find((d) => d.id === form.doctorId);
    setDoctor(selected || null);
  }, [form.doctorId, doctors]);

  /* ---------------- GENERATE SLOT LIST ---------------- */

  const allSlots = useMemo(() => {
    if (!doctor) return [];

    const start = doctor?.startHour ?? 9;
    const end = doctor?.endHour ?? 17;
    const interval = doctor?.slotDuration ?? 30;

    return generateSlots(start, end, interval);
  }, [doctor]);

  /* ---------------- LOAD AVAILABLE SLOTS ---------------- */

  useEffect(() => {
    if (!form.doctorId || !form.date || !doctor) return;

    const working = isDoctorWorkingDay(doctor, form.date);

    if (!working) {
      setAvailableSlots([]);
      return;
    }

    const unsubscribe = subscribeDoctorSlots(
      form.doctorId,
      form.date,
      (bookedSlots) => {
        const available = filterAvailableSlots(allSlots, bookedSlots);
        setAvailableSlots(available);
      },
    );

    return () => unsubscribe();
  }, [form.doctorId, form.date, doctor, allSlots]);

  /* ---------------- STEP VALIDATION ---------------- */

  const canGoNext = () => {
    switch (step) {
      case 1:
        return form.department !== "";
      case 2:
        return form.doctorId !== "";
      case 3:
        return form.date !== "";
      case 4:
        return form.time !== "";
      case 5:
        return form.patientName && form.phone && form.email;
      default:
        return true;
    }
  };

  /* ---------------- NAVIGATION ---------------- */

  const nextStep = () => {
    if (step < 5 && canGoNext()) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (fromDoctorPage && step <= 3) return;
    if (fromDepartmentPage && step <= 2) return;

    if (step > 1) setStep((s) => s - 1);
  };

  /* ---------------- INPUT HANDLER ---------------- */

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

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await createAppointment({
        ...form,
        userId: user.uid,

        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,

        departmentId: form.department,
        departmentName:
          departments.find((d) => d.id === form.department)?.name || "",
      });

      const name = form.patientName.split(" ")[0];

      alert(`Thank you ${name}! Your appointment has been booked.`);

      setTimeout(() => {
        navigate("/profile/appointments");
      }, 1500);
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PROGRESS BAR */}

      <div className="flex justify-between text-sm font-medium">
        {["Department", "Doctor", "Date", "Time", "Details"].map((label, i) => (
          <span
            key={label}
            className={step >= i + 1 ? "text-blue-500 font-semibold" : ""}
          >
            {label}
          </span>
        ))}
      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <select
          name="department"
          value={form.department}
          disabled={fromDepartmentPage || fromDoctorPage}
          onChange={(e) => {
            handleChange(e);
            nextStep();
          }}
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

      {/* STEP 2 */}

      {step === 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {doctors.map((doc) => (
            <button
              key={doc.id}
              type="button"
              disabled={fromDoctorPage}
              onClick={() => selectDoctor(doc)}
              className="
              border border-gray-200 dark:border-white/10
              p-4 rounded-lg text-left
              hover:border-blue-500
              disabled:opacity-40
              "
            >
              <div className="font-semibold">{doc.name}</div>
              <div className="text-sm text-gray-500">{doc.specialty}</div>
            </button>
          ))}
        </div>
      )}

      {/* STEP 3 */}

      {step === 3 && doctor && (
        <DoctorAvailabilityCalendar
          selectedDate={form.date}
          onSelect={selectDate}
          doctor={doctor}
        />
      )}

      {/* STEP 4 */}

      {step === 4 && (
        <SlotGrid
          slots={availableSlots}
          selected={form.time}
          onSelect={selectSlot}
        />
      )}

      {/* STEP 5 */}

      {step === 5 && (
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
            disabled={!canGoNext() || loading}
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

      {/* NAVIGATION */}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 1}
          className="
          px-4 py-2 rounded-lg
          border border-gray-300
          hover:bg-gray-100
          disabled:opacity-40
          "
        >
          ← Previous
        </button>

        {step !== 5 && (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canGoNext()}
            className="
            px-4 py-2 rounded-lg
            bg-blue-500 hover:bg-blue-600
            text-white
            disabled:opacity-40
            "
          >
            Next →
          </button>
        )}
      </div>
    </form>
  );
}
