import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  createAppointment,
  subscribeDoctorSlots,
} from "../../api/appointmentsApi";

import { getAllDepartments } from "../../api/departmentsApi";
import { getDoctorsByDepartment } from "../../api/doctorsApi";
import { getPackages } from "../../api/packagesApi";

import {
  generateSlots,
  filterAvailableSlots,
  isDoctorWorkingDay,
} from "../../utils/generateSlots";

import SlotGrid from "../common/SlotGrid";
import DoctorAvailabilityCalendar from "../common/DoctorAvailabilityCalendar";

import { auth } from "../../firebase";
import { notifyPromise, notifyError } from "../../utils/toast";

const FEES = {
  regular: 200,
  emergency: 500,
  reschedule: 100,
};

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  /* SLOT */

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

    return subscribeDoctorSlots(form.doctorId, form.date, (booked) => {
      setAvailableSlots(filterAvailableSlots(allSlots, booked));
    });
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

    try {
      setLoading(true);

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

        status: "pending",
        createdAt: new Date(),
      };

      await notifyPromise(createAppointment(payload), {
        loading: "Booking...",
        success: "Booked!",
        error: "Failed",
      });

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
        <p className="text-gray-500">
          Stay positive. Wishing you good health 💙
        </p>
      </div>
    );
  }

  /* UI */

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      {/* TYPE */}
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

      {/* STEP FLOW SAME (no buttons) */}

      {step === 1 && (
        <select
          value={form.department}
          onChange={(e) => {
            setForm((p) => ({ ...p, department: e.target.value }));
            setStep(2);
          }}
          className="ui-select w-full"
        >
          <option>Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      )}

      {step === 2 && (
        <div className="grid sm:grid-cols-2 gap-3">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                setForm((p) => ({ ...p, doctorId: doc.id }));
                setStep(3);
              }}
              className="border p-4 rounded cursor-pointer hover:border-blue-500"
            >
              {doc.name}
            </div>
          ))}
        </div>
      )}

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

      {step === 4 && (
        <SlotGrid
          slots={availableSlots}
          selected={form.time}
          onSelect={(t) => {
            setForm((p) => ({ ...p, time: t }));
            setStep(5);
          }}
        />
      )}

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

          {/* FEES UI */}
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
