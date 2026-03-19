import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { subscribeDoctorSlots } from "../../api/appointmentsApi";
import { useBookingEngine } from "../../hooks/useBookingEngine";

import { getAllDepartments } from "../../api/departmentsApi";
import { getDoctorsByDepartment } from "../../api/doctorsApi";
import { getPackages } from "../../api/packagesApi";

import {
  generateSlots,
  filterAvailableSlots,
  filterPastSlots,
  isDoctorWorkingDay,
} from "../../utils/generateSlots";

import SlotGrid from "../common/SlotGrid";
import DoctorAvailabilityCalendar from "../common/DoctorAvailabilityCalendar";

import { auth } from "../../firebase";
import { notifyError } from "../../utils/toast";

import CustomSelect from "../common/CustomSelect";

const FEES = {
  regular: 200,
  emergency: 500,
};

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { book } = useBookingEngine();

  /* URL PARAMS */
  const packageParam = searchParams.get("package");
  const packageNameParam = searchParams.get("packageName");

  /* STATE */
  const [appointmentType, setAppointmentType] = useState("regular");
  const [packages, setPackages] = useState([]);

  const [step, setStep] = useState(1);
  const [successData, setSuccessData] = useState(null);
  const [countdown, setCountdown] = useState(6);

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

  /* 🔥 SLOT SYSTEM */
  const [slotState, setSlotState] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    getAllDepartments().then(setDepartments);
    getPackages().then(setPackages);
  }, []);

  useEffect(() => {
    if (!form.department) return;
    getDoctorsByDepartment(form.department).then(setDoctors);
  }, [form.department]);

  useEffect(() => {
    setDoctor(doctors.find((d) => d.id === form.doctorId) || null);
  }, [form.doctorId, doctors]);

  /* ================= SLOT GENERATION ================= */
  const allSlots = useMemo(() => {
    if (!doctor) return [];
    return generateSlots(
      doctor.startHour ?? 9,
      doctor.endHour ?? 17,
      doctor.slotDuration ?? 30,
    );
  }, [doctor]);

  /* ================= SLOT PIPELINE ================= */
  useEffect(() => {
    if (!form.doctorId || !form.date || !doctor) return;

    if (!isDoctorWorkingDay(doctor, form.date)) {
      setAvailableSlots([]);
      setSlotState([]);
      return;
    }

    const unsubscribe = subscribeDoctorSlots(
      form.doctorId,
      form.date,
      (slots) => {
        setSlotState(slots);

        // fallback logic
        const blocked = slots
          .filter((s) => s.isBooked || s.isLocked)
          .map((s) => s.time?.trim());

        const available = filterAvailableSlots(
          allSlots.map((t) => t?.trim()),
          blocked,
        );

        const future = filterPastSlots(available, form.date);

        setAvailableSlots([...future]);
      },
    );

    return () => unsubscribe && unsubscribe();
  }, [form.doctorId, form.date, doctor, allSlots]);

  /* ================= NAVIGATION ================= */
  const nextStep = () => {
    if (step === 1 && !form.department) return notifyError("Select department");
    if (step === 2 && !form.doctorId) return notifyError("Select doctor");
    if (step === 3 && !form.date) return notifyError("Select date");
    if (step === 4 && !form.time) return notifyError("Select time");

    setStep((s) => Math.min(s + 1, 5));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  /* ================= FEES ================= */
  const getPackagePrice = () => {
    const pkg = packages.find((p) => p.id === form.packageId);
    return Number(pkg?.price?.replace(/[^\d]/g, "")) || 0;
  };

  const appointmentFee = FEES[appointmentType];
  const packageFee = getPackagePrice();
  const totalAmount = appointmentFee + packageFee;

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return;

    if (!form.department || !form.doctorId || !form.date || !form.time) {
      notifyError("Complete all steps");
      return;
    }

    const user = auth.currentUser;
    if (!user) return notifyError("Login required");

    submittingRef.current = true;
    setLoading(true);

    try {
      const payload = {
        ...form,
        userId: user.uid,
        doctorName: doctor?.name || "",
        doctorSpecialty: doctor?.specialty || "",
        departmentId: form.department,
        departmentName:
          departments.find((d) => d.id === form.department)?.name || "",
        appointmentType,
        appointmentFee,
        packageFee,
        totalAmount,
        isReschedule: false,
      };

      const result = await book(payload);

      if (!result.success) {
        notifyError(result.error || "Slot unavailable");
        return;
      }

      setSuccessData(payload);
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  /* ================= AUTO REDIRECT ================= */
  useEffect(() => {
    if (!successData) return;

    const interval = setInterval(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/profile/appointments");
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [successData, navigate]);

  /* ================= SUCCESS ================= */
  if (successData) {
    return (
      <div className="text-center py-20 space-y-3">
        <h2 className="text-xl font-bold text-green-600">
          Appointment Confirmed 🎉
        </h2>
        <p>
          {successData.patientName}, your appointment is booked on{" "}
          {successData.date} at {successData.time}
        </p>
        <p>Redirecting in {countdown}s...</p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto space-y-6 px-2 sm:px-0"
    >
      {/* STEP 1 */}
      {step === 1 && (
        <>
          <div className="flex gap-3">
            {["regular", "emergency"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setAppointmentType(t)}
                className={`px-4 py-2 rounded-lg border ${
                  appointmentType === t ? "bg-blue-500 text-white" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <CustomSelect
            options={departments}
            value={form.department}
            placeholder="Select Department"
            onChange={(val) => setForm((p) => ({ ...p, department: val }))}
          />
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {doctors.map((doc) => {
            const isSelected = form.doctorId === doc.id;

            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => setForm((p) => ({ ...p, doctorId: doc.id }))}
                className={`p-4 rounded-xl border ${
                  isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
              >
                {doc.name}
              </button>
            );
          })}
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && doctor && (
        <DoctorAvailabilityCalendar
          selectedDate={form.date}
          onSelect={(d) => setForm((p) => ({ ...p, date: d }))}
          doctor={doctor}
        />
      )}

      {/* STEP 4 (🔥 FINAL MERGED) */}
      {step === 4 && (
        <>
          {allSlots.length > 0 ? (
            <SlotGrid
              slots={allSlots}
              slotState={slotState}
              availableSlots={availableSlots}
              selected={form.time}
              onSelect={(t) => setForm((p) => ({ ...p, time: t }))}
            />
          ) : (
            <p className="text-sm text-gray-500 text-center">
              No slots available
            </p>
          )}
        </>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <>
          <input
            placeholder="Name"
            onChange={(e) =>
              setForm((p) => ({ ...p, patientName: e.target.value }))
            }
            className="ui-input"
          />

          <input
            placeholder="Phone"
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="ui-input"
          />

          <input
            placeholder="Email"
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="ui-input"
          />

          <div className="bg-gray-50 p-4 rounded">
            <p>Appointment: ₹{appointmentFee}</p>
            {packageFee > 0 && <p>Package: ₹{packageFee}</p>}
            <p className="font-bold">Total: ₹{totalAmount}</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow"
          >
            {loading ? "Booking..." : "Confirm"}
          </button>
        </>
      )}

      {/* NAVIGATION */}
      <div className="flex items-center justify-between gap-3 pt-6 border-t border-[var(--border)]">
        <div>
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 text-sm rounded-lg border bg-[var(--card)] hover:bg-[var(--section)] transition"
            >
              ← Previous
            </button>
          )}
        </div>

        <div className="ml-auto">
          {step < 5 && (
            <button
              type="button"
              onClick={nextStep}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
