import {
  createAppointmentEngine,
  cancelAppointmentEngine,
  rescheduleAppointmentEngine,
} from "./bookingEngine";

import {
  doc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

const appointmentsRef = collection(db, "appointments");
const slotsRef = collection(db, "appointmentSlots");

/* CREATE */

export const createAppointmentTransaction = (data) =>
  createAppointmentEngine(data);

/* STATUS */

export const updateAppointmentStatusService = async (id, status) => {
  await updateDoc(doc(db, "appointments", id), {
    status,
    updatedAt: serverTimestamp(),
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

/* 🔥 DOCTOR SLOT LISTENER (UPDATED — PRODUCTION SAFE) */

export const subscribeDoctorSlotsService = (doctorId, date, callback) => {
  const q = query(
    slotsRef,
    where("doctorId", "==", doctorId),
    where("date", "==", date),
  );

  return onSnapshot(q, (snap) => {
    const now = Date.now();

    const unavailableSlots = snap.docs
      .map((d) => d.data())
      .filter((slot) => {
        const expired = slot.lockedUntil && slot.lockedUntil.toMillis() < now;

        // Case 1: Fully booked
        if (slot.isBooked) return true;

        // Case 2: Actively locked (not expired)
        if (slot.isLocked && !expired) return true;

        return false;
      })
      .map((s) => s.time);

    callback(unavailableSlots);
  });
};
