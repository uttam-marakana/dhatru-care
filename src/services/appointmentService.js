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

/* 🔥 STATUS UPDATE (FINAL SAFE VERSION) */

export const updateAppointmentStatusService = async (id, status) => {
  const appointmentRef = doc(db, "appointments", id);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(appointmentRef);

    if (!snap.exists()) {
      throw new Error("Appointment not found");
    }

    const appointment = snap.data();
    const slotId = appointment.slotId;

    // 🔥 DEBUG (REMOVE AFTER TESTING)
    console.log("Releasing slot:", slotId, "Status:", status);

    // ✅ RELEASE SLOT on cancel/reject
    if (["cancelled", "rejected"].includes(status) && slotId) {
      const slotRef = doc(db, "appointmentSlots", slotId);

      const slotSnap = await transaction.get(slotRef);

      if (!slotSnap.exists()) {
        console.error("❌ Slot not found:", slotId);
      } else {
        transaction.update(slotRef, {
          isBooked: false,
          isLocked: false,
          lockedBy: null,
          lockedUntil: null,
          updatedAt: serverTimestamp(),
        });
      }
    }

    // ✅ UPDATE APPOINTMENT
    transaction.update(appointmentRef, {
      status,
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

/* 🔥 SLOT LISTENER (FINAL + REALTIME SAFE) */

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

        // booked
        if (slot.isBooked) return true;

        // active lock
        if (slot.isLocked && !expired) return true;

        return false;
      })
      .map((s) => s.time);

    callback(unavailableSlots);
  });
};
