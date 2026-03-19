import {
  createAppointmentEngine,
  cancelAppointmentEngine,
  rescheduleAppointmentEngine,
} from "./bookingEngine";

import {
  doc,
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";

import { db } from "../firebase";

const appointmentsRef = collection(db, "appointments");
const slotsRef = collection(db, "appointmentSlots");

/* CREATE */
export const createAppointmentTransaction = (data) =>
  createAppointmentEngine(data);

/* 🔥 STATUS UPDATE (FINAL BULLETPROOF VERSION) */
export const updateAppointmentStatusService = async (id, status) => {
  const appointmentRef = doc(db, "appointments", id);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(appointmentRef);

    if (!snap.exists()) {
      throw new Error("Appointment not found");
    }

    const appointment = snap.data();
    const slotId = appointment.slotId;

    // ✅ BULLETPROOF NORMALIZATION
    const normalizedStatus = String(status ?? "")
      .toLowerCase()
      .trim();

    // ✅ UNIVERSAL MATCH
    const releaseStatuses = ["cancelled", "canceled", "rejected", "reject"];

    const shouldRelease = releaseStatuses.includes(normalizedStatus);

    console.log("Status:", normalizedStatus);
    console.log("Should Release:", shouldRelease);
    console.log("Slot ID:", slotId);

    // 🔥 CRITICAL: FORCE SLOT RESET
    if (shouldRelease && slotId) {
      const slotRef = doc(db, "appointmentSlots", slotId);

      transaction.set(
        slotRef,
        {
          isBooked: false,
          isLocked: false,
          lockedBy: null,
          lockedUntil: null,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );

      console.log("✅ Slot released successfully");
    }

    // ✅ UPDATE APPOINTMENT
    transaction.update(appointmentRef, {
      status: normalizedStatus,
      updatedAt: serverTimestamp(),
    });
  });
};

/* CANCEL */
export const cancelAppointmentService = (id, slotId) =>
  cancelAppointmentEngine(id, slotId);

/* RESCHEDULE */
export const rescheduleAppointmentService = (appt, d, t) =>
  rescheduleAppointmentEngine(appt, d, t);

/* ADMIN */
export const subscribeAppointmentsService = (callback) => {
  const q = query(appointmentsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })),
    );
  });
};

/* USER */
export const subscribeUserAppointmentsService = (userId, callback) => {
  const q = query(
    appointmentsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })),
    );
  });
};

/* 🔥 SLOT LISTENER (FINAL SAFE VERSION) */
export const subscribeDoctorSlotsService = (doctorId, date, callback) => {
  const q = query(
    slotsRef,
    where("doctorId", "==", doctorId),
    where("date", "==", date),
  );

  return onSnapshot(q, (snap) => {
    const now = Date.now();

    const slotState = snap.docs.map((d) => {
      const data = d.data();

      const expired =
        data.lockedUntil &&
        data.lockedUntil.toMillis &&
        data.lockedUntil.toMillis() < now;

      const isLocked = data.isLocked && !expired;
      
      const isBooked = !!data.isBooked || !!data.booked;

      return {
        time: data.time?.trim(),
        isBooked,
        isLocked,
      };
    });

    callback(slotState);
  });
};
