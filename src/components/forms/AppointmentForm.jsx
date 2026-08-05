import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { subscribeDoctorSlots } from "../../api/appointmentsApi";
import { useBookingEngine } from "../../hooks/useBookingEngine";

import { getAllDepartments } from "../../api/departmentsApi";
import { getDoctors, getDoctorsByDepartment } from "../../api/doctorsApi";
import { getPackages } from "../../api/packagesApi";

import { useAuth } from "../../context/AuthContext";

import {
  generateSlots,
  filterAvailableSlots,
  filterPastSlots,
  isDoctorWorkingDay,
} from "../../utils/generateSlots";

import SlotGrid from "../common/SlotGrid";
import DoctorAvailabilityCalendar from "../common/DoctorAvailabilityCalendar";
import Input from "../common/Input";
import CustomSelect from "../common/CustomSelect";

import { getDepartmentsForPackage } from "../../config/packageDoctorMap";

import { subscribeDoctorDatesAvailability } from "../../services/dateAvailabilityService";

import { notifyError } from "../../utils/toast";

const FEES = {
  regular: 200,
  emergency: 500,
};

export default function AppointmentForm({ selectedPackage }) {
  const navigate = useNavigate();
const [searchParams] = useSearchParams();
  const { book } = useBookingEngine();
  const { user, tenantId } = useAuth();

/* URL PARAMS ----------- */
  const packageParam = searchParams.get("package") || selectedPackage;
  const packageNameParam =
    searchParams.get("packageName") ||
    (selectedPackage
      ? packages.find((p) => p.id === selectedPackage)?.name
      : "");

  // When launched from a package "Book Now", lock the package selection.
  const isPackageLocked = Boolean(packageParam);

  /* STATE ----------- */
  const [appointmentType, setAppointmentType] = useState("regular");
  const [packages, setPackages] = useState([]);

  const [step, setStep] = useState(1);
  const [successData, setSuccessData] = useState(null);
  const [countdown, setCountdown] = useState(6);

  const [dateAvailability, setDateAvailability] = useState({});

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
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);

  /* SLOT SYSTEM ----------- */
  const [slotState, setSlotState] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  /* --- LOAD ----------- */
  useEffect(() => {
    getAllDepartments().then(setDepartments);
    getPackages().then(setPackages);
  }, []);

  // Prefill from prop/params
  useEffect(() => {
    if (packageParam) {
      setForm(prev => ({ ...prev, packageId: packageParam }));
    }
  }, [packageParam]);

// When a package is locked, only offer its relevant departments so the
  // patient can pick one and always see applicable doctors on step 2.
  const packageDepartmentIds = getDepartmentsForPackage(
    form.packageName || packageNameParam,
  );

  const departmentOptions =
    isPackageLocked && packageDepartmentIds.length > 0
      ? departments.filter((d) => packageDepartmentIds.includes(d.id))
      : departments;

useEffect(() => {
    let mounted = true;

    const loadDoctors = async () => {
      setDoctorsLoading(true);

      try {
        let data;

        // Reliable server-side filter by the selected department.
        if (form.department) {
          data = await getDoctorsByDepartment(form.department);
        } else {
          data = await getDoctors();
        }

        if (!mounted) return;

        let filtered = data || [];

        // When a package is active, further restrict to its mapped departments.
        if (packageDepartmentIds.length > 0) {
          filtered = filtered.filter((d) =>
            packageDepartmentIds.includes(d.departmentId),
          );
        }

        setDoctors(filtered);
      } finally {
        if (mounted) setDoctorsLoading(false);
      }
    };

    loadDoctors();

    return () => {
      mounted = false;
    };
  }, [form.department, form.packageName, packageNameParam]);

  useEffect(() => {
    setDoctor(doctors.find((d) => d.id === form.doctorId) || null);
  }, [form.doctorId, doctors]);

  useEffect(() => {
    if (!form.doctorId) return;

    const unsub = subscribeDoctorDatesAvailability(
      form.doctorId,
      setDateAvailability,
    );

    return () => unsub && unsub();
  }, [form.doctorId]);

  /* --- SLOT GENERATION ----------- */
  const allSlots = useMemo(() => {
    if (!doctor) return [];
    return generateSlots(
      doctor.startHour ?? 9,
      doctor.endHour ?? 17,
      doctor.slotDuration ?? 30,
    );
  }, [doctor]);

  /* --- SLOT PIPELINE ----------- */
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

  /* --- NAVIGATION ----------- */
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

  /* --- FEES ----------- */
  const getPackagePrice = () => {
    const pkg = packages.find((p) => p.id === form.packageId);
    return Number(String(pkg?.price || "").replace(/[^\d]/g, "")) || 0;
  };

  const appointmentFee = FEES[appointmentType];
  const packageFee = getPackagePrice();
  const totalAmount = appointmentFee + packageFee;

  const isStep5Valid = form.patientName.trim() && form.phone.trim() && form.email.trim();

  /* --- SUBMIT ----------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return;

    if (!form.department || !form.doctorId || !form.date || !form.time) {
      notifyError("Complete all required steps first");
      return;
    }

    if (!isStep5Valid) {
      notifyError("Please fill patient name, phone, and email");
      return;
    }

    if (!user) {
      notifyError("Please login to book appointment");
      return;
    }

    if (!tenantId) {
      notifyError("Hospital configuration missing");
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    try {
      const payload = {
        ...form,
        userId: user.uid,
        tenantId,
        hospitalId: tenantId,

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
        notifyError(result.error || "Booking failed - slot unavailable");
        return;
      }

      setSuccessData(payload);
    } catch (err) {
      notifyError(err.message || "Booking failed");
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  /* --- AUTO REDIRECT ----------- */
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

  /* --- SUCCESS ----------- */
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
        <p>Redirecting to your appointments in {countdown}s...</p>
      </div>
    );
  }

  /* --- UI ----------- */
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto space-y-6 px-2 sm:px-0"
    >
      {/* --- STEP 1 ----------- */}
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
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

<CustomSelect
            options={packages.map(p => ({ value: p.id, label: p.name + ' (₹' + p.price + ')' }))}
            value={form.packageId}
            placeholder="Select Package (Optional)"
            disabled={isPackageLocked}
            onChange={(val) => setForm((p) => ({ ...p, packageId: val, packageName: packages.find(pkg => pkg.id === val)?.name || '' }))}
          />

<CustomSelect
            options={departmentOptions}
            value={form.department}
            placeholder="Select Department"
            onChange={(val) => setForm((p) => ({ ...p, department: val }))}
          />
        </>
      )}

{/* --- STEP 2 ----------- */}
      {step === 2 && (
        <>
          {doctorsLoading ? (
            <div className="text-center py-10">
              <p className="text-sm text-gray-500">Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-gray-500 mb-2">
                No doctors available for the selected department.
              </p>
              <button
                type="button"
                onClick={prevStep}
                className="text-xs text-blue-600 underline"
              >
                ← Go back and change department
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {doctors.map((doc) => {
                const isSelected = form.doctorId === doc.id;

                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, doctorId: doc.id }))}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-1 text-sm ${
                      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-xs opacity-75">{doc.specialty}</div>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* --- STEP 3 ----------- */}
      {step === 3 && doctor && (
        <DoctorAvailabilityCalendar
          selectedDate={form.date}
          onSelect={(d) => setForm((p) => ({ ...p, date: d }))}
          doctor={doctor}
          availability={dateAvailability}
        />
      )}

      {/* --- STEP 4 ----------- */}
      {step === 4 && (
        <>
          {availableSlots.length > 0 ? (
            <SlotGrid
              slots={availableSlots}
              slotState={slotState}
              availableSlots={availableSlots}
              selected={form.time}
              onSelect={(t) => setForm((p) => ({ ...p, time: t }))}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-2">No available slots</p>
              <p className="text-xs text-gray-400">Try different date or doctor</p>
            </div>
          )}
        </>
      )}

      {/* --- STEP 5 ----------- */}
      {step === 5 && (
        <>
          <Input
            placeholder="Full Name *"
            value={form.patientName}
            onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))}
            required
          />

          <Input
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            required
          />

          <Input
            placeholder="Email (Optional)"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />

          <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] space-y-1">
            <div className="text-sm">
              Appointment Fee: ₹{appointmentFee}
            </div>
            {packageFee > 0 && (
              <div className="text-sm">
                Package: ₹{packageFee}
              </div>
            )}
            <div className="font-semibold text-lg">
              Total: ₹{totalAmount}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isStep5Valid || loading}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Booking...
              </>
            ) : (
              "Confirm & Book Appointment"
            )}
          </button>
        </>
      )}

      {/* --- NAVIGATION ----------- */}
      <div className="flex items-center justify-between gap-3 pt-6 border-t border-[var(--border)]">
        <div>
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 text-sm rounded-lg border bg-[var(--card)] hover:bg-[var(--section)] transition-all flex items-center gap-1"
            >
              ← Previous Step
            </button>
          )}
        </div>

        <div className="ml-auto text-sm text-gray-500">
          Step {step} of 5
        </div>

        <div>
          {step < 5 && (
            <button
              type="button"
              onClick={nextStep}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
            >
              Next Step →
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
