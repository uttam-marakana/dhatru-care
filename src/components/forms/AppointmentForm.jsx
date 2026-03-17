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

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* ---------------- PARAMS ---------------- */

  const packageParam = searchParams.get("package");
  const packageNameParam = searchParams.get("packageName");
  const departmentParam = searchParams.get("department");
  const doctorParam = searchParams.get("doctor");

  const getInitialStep = () => {
    if (doctorParam) return 3;
    if (departmentParam) return 2;
    return 1;
  };

  const [step, setStep] = useState(getInitialStep());

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    department: departmentParam || "",
    doctorId: doctorParam || "",
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

  /* ---------------- PROGRESS ---------------- */

  const progress = (step / 5) * 100;

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

  const nextStep = () => step < 5 && setStep((s) => s + 1);
  const prevStep = () => step > 1 && setStep((s) => s - 1);

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

  /* ---------------- SLOT ENGINE ---------------- */

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

    if (!isDoctorWorkingDay(doctor, form.date)) {
      setAvailableSlots([]);
      return;
    }

    const unsub = subscribeDoctorSlots(form.doctorId, form.date, (booked) => {
      const filtered = filterAvailableSlots(allSlots, booked);
      setAvailableSlots(filtered);
    });

    return () => unsub();
  }, [form.doctorId, form.date, doctor, allSlots]);

  /* ---------------- SMART DATA ---------------- */

  const earliestSlot = availableSlots?.[0] || null;
  const slotsLeft = availableSlots.length;

  // Fake social proof (can later replace with real analytics)
  const bookingsToday = 12 + Math.floor(Math.random() * 15);

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
        doctorName: doctor?.name,
        doctorSpecialty: doctor?.specialty,
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
      {/* PROGRESS */}
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* PACKAGE */}
      {form.packageName && (
        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
          Selected: <strong>{form.packageName}</strong>
        </div>
      )}

      {/* DOCTOR CARD */}
      {doctor && (
        <div className="p-4 border rounded-xl bg-[var(--card)]">
          <div className="font-semibold">{doctor.name}</div>
          <div className="text-sm text-gray-500">{doctor.specialty}</div>
          <div className="text-xs mt-1">
            ⏰ {doctor.startHour}:00 - {doctor.endHour}:00
          </div>

          <div className="text-xs mt-2 text-green-600">
            🔥 {bookingsToday}+ patients booked today
          </div>
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
        <>
          {earliestSlot && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
              ⚡ Earliest Slot: <strong>{earliestSlot}</strong>
              <button
                type="button"
                className="ml-3 underline"
                onClick={() => selectSlot(earliestSlot)}
              >
                Book Now
              </button>
            </div>
          )}

          {slotsLeft <= 3 && slotsLeft > 0 && (
            <div className="text-sm text-red-500">
              ⚠ Only {slotsLeft} slots left today
            </div>
          )}

          <SlotGrid
            slots={availableSlots}
            selected={form.time}
            onSelect={selectSlot}
          />
        </>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <>
          <input
            name="patientName"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="ui-input"
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
            className="ui-input"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="ui-input"
          />
          <textarea
            name="message"
            placeholder="Notes"
            onChange={handleChange}
            className="ui-textarea"
          />

          <button className="ui-button">
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </>
      )}

      {/* NAV */}
      <div className="flex justify-between">
        <button type="button" onClick={prevStep} disabled={step === 1}>
          ← Back
        </button>

        {step !== 5 && (
          <button type="button" onClick={nextStep} disabled={!canGoNext()}>
            Next →
          </button>
        )}
      </div>
    </form>
  );
}
