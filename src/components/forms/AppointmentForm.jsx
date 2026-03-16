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
import { db } from "../../firebase";

import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

import { notifyPromise, notifyError } from "../../utils/toast";

/* ---------------- UI STYLES ---------------- */

const inputStyle = "ui-input";
const selectStyle = "ui-select";
const textareaStyle = "ui-textarea";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const departmentParam = searchParams.get("department");
  const doctorParam = searchParams.get("doctor");
  const packageParam = searchParams.get("package");

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
    packageId: packageParam || "",
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- HELPERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const selectDoctor = (doc) => {
    setForm((p) => ({ ...p, doctorId: doc.id }));
    setStep(3);
  };

  const selectDate = (date) => {
    setForm((p) => ({ ...p, date }));
    setStep(4);
  };

  const selectSlot = (time) => {
    setForm((p) => ({ ...p, time }));
    setStep(5);
  };

  const canGoNext = () => {
    if (step === 1) return form.department;
    if (step === 2) return form.doctorId;
    if (step === 3) return form.date;
    if (step === 4) return form.time;
    if (step === 5) return form.patientName && form.phone && form.email;
    return false;
  };

  /* ---------------- SLOT LOCKING ---------------- */

  const lockSlot = async (doctorId, date, time) => {
    const slotRef = doc(db, "slotLocks", `${doctorId}_${date}_${time}`);

    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(slotRef);

      if (snap.exists()) {
        throw new Error("This slot was just booked. Please choose another.");
      }

      transaction.set(slotRef, {
        doctorId,
        date,
        time,
        createdAt: serverTimestamp(),
      });
    });
  };

  /* ---------------- LOAD DEPARTMENTS ---------------- */

  useEffect(() => {
    const loadDepartments = async () => {
      const data = await getAllDepartments();
      setDepartments(data || []);

      if (departmentParam) {
        setForm((p) => ({ ...p, department: departmentParam }));
        setStep(2);
      }
    };

    loadDepartments();
  }, []);

  /* ---------------- LOAD DOCTORS ---------------- */

  useEffect(() => {
    if (!form.department) return;

    const loadDoctors = async () => {
      const data = await getDoctorsByDepartment(form.department);
      setDoctors(data || []);

      if (doctorParam) {
        const found = data.find((d) => d.id === doctorParam);

        if (found) {
          setForm((p) => ({
            ...p,
            department: found.departmentId,
            doctorId: found.id,
          }));

          setStep(3);
        }
      }
    };

    loadDoctors();
  }, [form.department]);

  useEffect(() => {
    const selected = doctors.find((d) => d.id === form.doctorId);
    setDoctor(selected || null);
  }, [form.doctorId, doctors]);

  /* ---------------- SLOT GENERATION ---------------- */

  const allSlots = useMemo(() => {
    if (!doctor) return [];

    return generateSlots(
      doctor.startHour ?? 9,
      doctor.endHour ?? 17,
      doctor.slotDuration ?? 30,
    );
  }, [doctor]);

  useEffect(() => {
    if (!form.doctorId || !form.date || !doctor) return;

    const working = isDoctorWorkingDay(doctor, form.date);

    if (!working) {
      setAvailableSlots([]);
      return;
    }

    const unsub = subscribeDoctorSlots(
      form.doctorId,
      form.date,
      (bookedSlots) => {
        const available = filterAvailableSlots(allSlots, bookedSlots);
        setAvailableSlots(available);
      },
    );

    return () => unsub();
  }, [form.doctorId, form.date, doctor, allSlots]);

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      notifyError("Please login to book an appointment");
      navigate("/login");
      return;
    }

    if (!form.date || !form.time) {
      notifyError("Please select a date and time slot");
      return;
    }

    try {
      setLoading(true);

      await lockSlot(form.doctorId, form.date, form.time);

      const payload = {
        ...form,
        userId: user.uid,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        departmentId: form.department,
        departmentName:
          departments.find((d) => d.id === form.department)?.name || "",
      };

      await notifyPromise(createAppointment(payload), {
        loading: "Booking appointment...",
        success: "Appointment booked successfully!",
        error: "Failed to book appointment",
      });

      navigate("/profile/appointments");
    } catch (err) {
      console.error(err);
      notifyError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {packageParam && (
        <div className="p-3 rounded-lg bg-blue-50 text-sm text-blue-700">
          Booking from selected health package
        </div>
      )}

      {/* STEP INDICATOR */}

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
          className={selectStyle}
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
              className="border border-gray-200 p-4 rounded-lg text-left hover:border-blue-500 disabled:opacity-40"
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
            className={textareaStyle}
          />

          <button
            disabled={!canGoNext() || loading}
            className="ui-button disabled:opacity-50"
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
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40"
        >
          ← Previous
        </button>

        {step !== 5 && (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canGoNext()}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-40"
          >
            Next →
          </button>
        )}
      </div>
    </form>
  );
}
