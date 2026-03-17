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
    if (doctorParam && departmentParam) return 3;
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
  const [successData, setSuccessData] = useState(null);

  const submittingRef = useRef(false);

  /* ---------------- LOAD ---------------- */

  useEffect(() => {
    getAllDepartments().then(setDepartments);
  }, []);

  /* PACKAGE → AUTO DEPARTMENT (safe fallback) */
  useEffect(() => {
    if (packageParam && departments.length && !form.department) {
      setForm((p) => ({
        ...p,
        department: departments[0]?.id || "",
      }));
      setStep(2);
    }
  }, [packageParam, departments]);

  useEffect(() => {
    if (!form.department) return;
    getDoctorsByDepartment(form.department).then(setDoctors);
  }, [form.department]);

  /* AUTO DOCTOR FROM URL */
  useEffect(() => {
    if (doctorParam && doctors.length) {
      const found = doctors.find((d) => d.id === doctorParam);
      if (found) {
        setDoctor(found);
        setForm((p) => ({ ...p, doctorId: found.id }));
        setStep(3);
      }
    }
  }, [doctorParam, doctors]);

  useEffect(() => {
    setDoctor(doctors.find((d) => d.id === form.doctorId) || null);
  }, [form.doctorId, doctors]);

  /* ---------------- SLOT ---------------- */

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
      setAvailableSlots(filterAvailableSlots(allSlots, booked));
    });

    return () => unsub();
  }, [form.doctorId, form.date, doctor, allSlots]);

  const earliestSlot = availableSlots?.[0];
  const slotsLeft = availableSlots.length;

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;

    const user = auth.currentUser;

    if (!user) {
      notifyError("Login required");
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
        status: "booked",
        createdAt: new Date(),
      };

      await notifyPromise(createAppointment(payload), {
        loading: "Booking...",
        success: "Booked successfully!",
        error: "Booking failed",
      });

      trackBookingSuccess(form);

      setSuccessData(payload);
    } catch (err) {
      notifyError(err.message || "Slot taken");
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  /* ---------------- SUCCESS SCREEN ---------------- */

  if (successData) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-green-600">
          Appointment Confirmed 🎉
        </h2>

        <p>
          Hello <strong>{successData.patientName}</strong>,
        </p>

        <p>
          Your appointment is booked on <strong>{successData.date}</strong> at{" "}
          <strong>{successData.time}</strong>.
        </p>

        <p className="text-gray-500">
          Stay strong and positive. Wishing you a speedy recovery 💙
        </p>

        <button onClick={() => navigate("/")} className="ui-button mt-4">
          Go Home
        </button>
      </div>
    );
  }

  /* ---------------- FALLBACK ---------------- */

  if (step === 3 && !doctor) {
    return <div className="py-20 text-center">Loading doctor...</div>;
  }

  /* ---------------- UI ---------------- */

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {form.packageName && (
        <div className="p-3 bg-blue-50 text-blue-700 rounded">
          Selected: <strong>{form.packageName}</strong>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <select
          name="department"
          value={form.department}
          onChange={(e) => {
            setForm((p) => ({ ...p, department: e.target.value }));
            setStep(2);
          }}
          className="ui-select"
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
        <div className="grid sm:grid-cols-2 gap-3">
          {doctors.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => {
                setForm((p) => ({ ...p, doctorId: doc.id }));
                setStep(3);
              }}
              className="border p-4 rounded"
            >
              {doc.name}
            </button>
          ))}
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
          {earliestSlot && (
            <div className="text-green-600 text-sm">
              Earliest: {earliestSlot}
              <button
                onClick={() => {
                  setForm((p) => ({ ...p, time: earliestSlot }));
                  setStep(5);
                }}
              >
                {" "}
                Book
              </button>
            </div>
          )}

          {slotsLeft <= 3 && (
            <div className="text-red-500 text-sm">
              Only {slotsLeft} slots left
            </div>
          )}

          <SlotGrid
            slots={availableSlots}
            selected={form.time}
            onSelect={(t) => {
              setForm((p) => ({ ...p, time: t }));
              setStep(5);
            }}
          />
        </>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <>
          <input
            name="patientName"
            placeholder="Name"
            onChange={(e) =>
              setForm((p) => ({ ...p, patientName: e.target.value }))
            }
            className="ui-input"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="ui-input"
            required
          />
          <input
            name="email"
            placeholder="Email"
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="ui-input"
            required
          />

          <button className="ui-button">
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </>
      )}
    </form>
  );
}
