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

  const packageParam = searchParams.get("package");
  const packageNameParam = searchParams.get("packageName");

  const [appointmentType, setAppointmentType] = useState("regular");
  const [packages, setPackages] = useState([]);

  const [step, setStep] = useState(1);
  const [successData, setSuccessData] = useState(null);

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

  /* LOAD */

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

  /* SLOT GENERATION */

  const allSlots = useMemo(() => {
    if (!doctor) return [];
    return generateSlots(
      doctor.startHour ?? 9,
      doctor.endHour ?? 17,
      doctor.slotDuration ?? 30,
    );
  }, [doctor]);

  /* SLOT PIPELINE (FIXED) */

  useEffect(() => {
    if (!form.doctorId || !form.date || !doctor) return;

    if (!isDoctorWorkingDay(doctor, form.date)) {
      setAvailableSlots([]);
      return;
    }

    const unsubscribe = subscribeDoctorSlots(
      form.doctorId,
      form.date,
      (unavailable) => {
        const available = filterAvailableSlots(allSlots, unavailable);
        const future = filterPastSlots(available, form.date);

        setAvailableSlots([...future]); // 🔥 force UI refresh
      },
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [form.doctorId, form.date, doctor, allSlots]);

  /* FEES */

  const getPackagePrice = () => {
    const pkg = packages.find((p) => p.id === form.packageId);
    return Number(pkg?.price?.replace(/[^\d]/g, "")) || 0;
  };

  const appointmentFee = FEES[appointmentType];
  const packageFee = getPackagePrice();
  const totalAmount = appointmentFee + packageFee;

  /* SUBMIT */

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

  /* SUCCESS */

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
      </div>
    );
  }

  /* UI */

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      {/* 🔥 TYPE (ONLY STEP 1) */}
      {step === 1 && (
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
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <CustomSelect
          options={departments}
          value={form.department}
          placeholder="Select Department"
          onChange={(val) => {
            setForm((p) => ({ ...p, department: val }));
            setStep(2);
          }}
        />
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {doctors.map((doc) => {
            const isSelected = form.doctorId === doc.id;

            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => {
                  setForm((p) => ({ ...p, doctorId: doc.id }));
                  setStep(3);
                }}
                className={`p-4 rounded-xl border text-left transition flex flex-col gap-1 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-500"
                }`}
              >
                <span className="font-medium">{doc.name}</span>
                {doc.specialty && (
                  <span className="text-xs text-gray-500">{doc.specialty}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && doctor && (
        <DoctorAvailabilityCalendar
          selectedDate={form.date}
          onSelect={(d) => {
            setForm((p) => ({ ...p, date: d }));
            setStep(4);
          }}
          doctor={doctor}
        />
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <>
          {availableSlots.length > 0 ? (
            <SlotGrid
              slots={availableSlots}
              selected={form.time}
              onSelect={(t) => {
                setForm((p) => ({ ...p, time: t }));
                setStep(5);
              }}
            />
          ) : (
            <p className="text-sm text-gray-500 text-center">
              No slots available for this date
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

          <button className="ui-button w-full">
            {loading ? "Booking..." : "Confirm"}
          </button>
        </>
      )}
    </form>
  );
}
