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

/* 🔥 STATUS UPDATE (FINAL — NORMALIZED + SAFE) */

export const updateAppointmentStatusService = async (id, status) => {
  const appointmentRef = doc(db, "appointments", id);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(appointmentRef);

    if (!snap.exists()) {
      throw new Error("Appointment not found");
    }

    const appointment = snap.data();
    const slotId = appointment.slotId;

    // ✅ normalize status
    const normalizedStatus = status?.toLowerCase().trim();

    console.log("Status received:", status);
    console.log("Normalized:", normalizedStatus);

    // ✅ RELEASE SLOT when cancelled/rejected
    if (["cancelled", "rejected"].includes(normalizedStatus) && slotId) {
      const slotRef = doc(db, "appointmentSlots", slotId);

      const slotSnap = await transaction.get(slotRef);

      if (slotSnap.exists()) {
        console.log("✅ Releasing slot:", slotId);

        transaction.update(slotRef, {
          isBooked: false,
          isLocked: false,
          lockedBy: null,
          lockedUntil: null,
          updatedAt: serverTimestamp(),
        });
      } else {
        console.warn("⚠️ Slot not found:", slotId);
      }
    }

    // ✅ update appointment
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

/* 🔥 SLOT LISTENER */

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
        data.lockedUntil && data.lockedUntil.toMillis() < now;

      return {
        time: data.time?.trim(),
        isBooked: data.isBooked || false,
        isLocked: data.isLocked && !expired,
      };
    });

    callback(slotState);
  });
};