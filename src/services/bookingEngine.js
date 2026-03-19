import {
  doc,
  runTransaction,
  serverTimestamp,
  Timestamp,
  collection,
} from "firebase/firestore";

import { db } from "../firebase";
import { APPOINTMENT_STATUS } from "../utils/appointmentStatus";

const SLOT_LOCK_MINUTES = 5;

/* HELPERS */

const buildSlotId = (doctorId, date, time) => `${doctorId}_${date}_${time}`;

/* VALIDATION */

const validateBookingInput = ({ doctorId, date, time, userId }) => {
  if (!doctorId || !date || !time || !userId) {
    throw new Error("Invalid booking data");
  }

  const selected = new Date(`${date} ${time}`);
  if (isNaN(selected.getTime())) {
    throw new Error("Invalid date/time format");
  }

  if (selected < new Date()) {
    throw new Error("Cannot book past slots");
  }
};

/* CORE LOCK CHECK */

const canTakeSlot = (slot, userId, now) => {
  if (!slot) return true;

  const isExpired =
    slot.lockedUntil && slot.lockedUntil.toMillis() < now.toMillis();

  // Hard booking
  if (slot.isBooked) return false;

  // Active lock by another user
  if (slot.isLocked && !isExpired && slot.lockedBy !== userId) {
    return false;
  }

  return true;
};

/* CREATE APPOINTMENT */

export const createAppointmentEngine = async (data) => {
  validateBookingInput(data);

  const slotId = buildSlotId(data.doctorId, data.date, data.time);

  const slotRef = doc(db, "appointmentSlots", slotId);
  const appointmentRef = doc(collection(db, "appointments"));

  await runTransaction(db, async (transaction) => {
    const now = Timestamp.now();

    const slotSnap = await transaction.get(slotRef);
    const slot = slotSnap.exists() ? slotSnap.data() : null;

    if (!canTakeSlot(slot, data.userId, now)) {
      throw new Error("Slot unavailable");
    }

    const lockedUntil = Timestamp.fromMillis(
      now.toMillis() + SLOT_LOCK_MINUTES * 60 * 1000,
    );

    /* LOCK + BOOK SLOT */

    transaction.set(
      slotRef,
      {
        doctorId: data.doctorId,
        hospitalId: data.hospitalId || "default",

        date: data.date,
        time: data.time,

        isLocked: true,
        isBooked: true,

        lockedBy: data.userId,
        lockedUntil,

        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    /* CREATE APPOINTMENT */

    transaction.set(appointmentRef, {
      ...data,

      slotId,
      hospitalId: data.hospitalId || "default",

      status: APPOINTMENT_STATUS.REQUESTED,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });

  return appointmentRef.id;
};

/* CANCEL */

export const cancelAppointmentEngine = async (appointmentId, slotId) => {
  const slotRef = doc(db, "appointmentSlots", slotId);
  const appointmentRef = doc(db, "appointments", appointmentId);

  await runTransaction(db, async (transaction) => {
    const slotSnap = await transaction.get(slotRef);

    if (slotSnap.exists()) {
      transaction.update(slotRef, {
        isBooked: false,
        isLocked: false,
        lockedBy: null,
        lockedUntil: null,
        updatedAt: serverTimestamp(),
      });
    }

    transaction.update(appointmentRef, {
      status: APPOINTMENT_STATUS.CANCELLED,
      updatedAt: serverTimestamp(),
    });
  });
};

/* RESCHEDULE */

export const rescheduleAppointmentEngine = async (
  appointment,
  newDate,
  newTime,
) => {
  const oldSlotRef = doc(db, "appointmentSlots", appointment.slotId);

  const newSlotId = buildSlotId(appointment.doctorId, newDate, newTime);

  const newSlotRef = doc(db, "appointmentSlots", newSlotId);
  const appointmentRef = doc(db, "appointments", appointment.id);

  await runTransaction(db, async (transaction) => {
    const now = Timestamp.now();

    const newSnap = await transaction.get(newSlotRef);
    const newSlot = newSnap.exists() ? newSnap.data() : null;

    if (!canTakeSlot(newSlot, appointment.userId, now)) {
      throw new Error("New slot unavailable");
    }

    /* FREE OLD SLOT */

    const oldSnap = await transaction.get(oldSlotRef);

    if (oldSnap.exists()) {
      transaction.update(oldSlotRef, {
        isBooked: false,
        isLocked: false,
        lockedBy: null,
        lockedUntil: null,
        updatedAt: serverTimestamp(),
      });
    }

    /* LOCK NEW SLOT */

    const lockedUntil = Timestamp.fromMillis(
      now.toMillis() + SLOT_LOCK_MINUTES * 60 * 1000,
    );

    transaction.set(
      newSlotRef,
      {
        doctorId: appointment.doctorId,
        hospitalId: appointment.hospitalId || "default",

        date: newDate,
        time: newTime,

        isLocked: true,
        isBooked: true,

        lockedBy: appointment.userId,
        lockedUntil,

        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    /* UPDATE APPOINTMENT */

    transaction.update(appointmentRef, {
      date: newDate,
      time: newTime,
      slotId: newSlotId,
      status: APPOINTMENT_STATUS.CONFIRMED,
      updatedAt: serverTimestamp(),
    });
  });
};
