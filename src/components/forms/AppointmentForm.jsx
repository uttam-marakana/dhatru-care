import { useState, useEffect, useMemo, useRef } from "react";
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

import {
  trackBookingAttempt,
  trackBookingSuccess,
} from "../../utils/bookingAnalytics";

import SlotGrid from "../common/SlotGrid";
import DoctorAvailabilityCalendar from "../common/DoctorAvailabilityCalendar";

import { auth } from "../../firebase";
import { notifyPromise, notifyError } from "../../utils/toast";

const inputStyle = "ui-input";
const selectStyle = "ui-select";
const textareaStyle = "ui-textarea";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const packageParam = searchParams.get("package");
  const packageNameParam = searchParams.get("packageName");

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
    packageName: packageNameParam || "",
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const submittingRef = useRef(false);

  /* ---------------- HELPERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" && { doctorId: "", date: "", time: "" }),
      ...(name === "doctorId" && { date: "", time: "" }),
    }));
  };

  const nextStep = () => {
    if (step < 5 && canGoNext()) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const selectDoctor = (doc) => {
    setForm((p) => ({ ...p, doctorId: doc.id }));
    setStep(3);
  };

  const selectDate = (date) => {
    setForm((p) => ({ ...p, date, time: "" }));
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

  /* ---------------- LOAD ---------------- */

  useEffect(() => {
    getAllDepartments().then(setDepartments);
  }, []);

  useEffect(() => {
    if (!form.department) return;
    getDoctorsByDepartment(form.department).then(setDoctors);
  }, [form.department]);

  useEffect(() => {
    setDoctor(doctors.find((d) => d.id === form.doctorId) || null);
  }, [form.doctorId, doctors]);

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

    const unsub = subscribeDoctorSlots(form.doctorId, form.date, (booked) => {
      setAvailableSlots(filterAvailableSlots(allSlots, booked));
    });

    return () => unsub();
  }, [form.doctorId, form.date, doctor, allSlots]);

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;

    const user = auth.currentUser;

    if (!user) {
      notifyError("Login required");
      submittingRef.current = false;
      return;
    }

    try {
      setLoading(true);

      trackBookingAttempt(form);

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
        loading: "Booking...",
        success: "Booked successfully!",
        error: "Booking failed",
      });

      trackBookingSuccess(form);

      navigate("/profile/appointments");
    } catch (err) {
      notifyError(err.message || "Slot taken");
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {loading && (
        <div className="text-sm text-blue-500">Securing your slot...</div>
      )}

      {form.packageName && (
        <div className="p-3 rounded-lg bg-blue-50 text-sm text-blue-700">
          Selected Package: <strong>{form.packageName}</strong>
        </div>
      )}

      <div className="flex justify-between text-sm font-medium">
        {["Department", "Doctor", "Date", "Time", "Details"].map((label, i) => (
          <span key={label} className={step >= i + 1 ? "text-blue-500" : ""}>
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

      <button
        disabled={!canGoNext() || loading}
        className="ui-button disabled:opacity-50"
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}
