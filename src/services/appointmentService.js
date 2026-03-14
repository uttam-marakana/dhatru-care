import {
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
  Timestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const appointmentsRef = collection(db, "appointments");
const slotsRef = collection(db, "appointmentSlots");

/* NEW: lock duration */
const SLOT_LOCK_MINUTES = 5;

/* CREATE APPOINTMENT */

export const createAppointmentTransaction = async (data) => {
  const slotId = `${data.doctorId}_${data.date}_${data.time}`;

  const slotRef = doc(db, "appointmentSlots", slotId);
  const appointmentRef = doc(appointmentsRef);

  await runTransaction(db, async (transaction) => {
    const slotDoc = await transaction.get(slotRef);

    const now = Timestamp.now();

    if (slotDoc.exists()) {
      const slot = slotDoc.data();

      const expired =
        slot.lockedUntil && slot.lockedUntil.toMillis() < now.toMillis();

      if (slot.booked && !expired) {
        throw new Error("This slot is already booked");
      }
    }

    /* NEW: slot expiration lock */

    const lockedUntil = Timestamp.fromMillis(
      now.toMillis() + SLOT_LOCK_MINUTES * 60 * 1000,
    );

    /* LOCK SLOT */

    transaction.set(
      slotRef,
      {
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        booked: true,
        lockedUntil,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    /* CREATE APPOINTMENT */

    transaction.set(appointmentRef, {
      userId: data.userId,

      patientName: data.patientName,
      phone: data.phone,
      email: data.email,
      message: data.message || "",

      doctorId: data.doctorId,
      doctorName: data.doctorName,
      doctorSpecialty: data.doctorSpecialty,

      departmentId: data.departmentId,
      departmentName: data.departmentName,

      date: data.date,
      time: data.time,

      slotId,
      status: "pending",

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });

  return appointmentRef.id;
};

/* UPDATE STATUS */

export const updateAppointmentStatusService = async (appointmentId, status) => {
  const ref = doc(db, "appointments", appointmentId);

  await updateDoc(ref, {
    status,
    updatedAt: serverTimestamp(),
  });
};

/* CANCEL */

export const cancelAppointmentService = async (appointmentId, slotId) => {
  const slotRef = doc(db, "appointmentSlots", slotId);
  const appointmentRef = doc(db, "appointments", appointmentId);

  await runTransaction(db, async (transaction) => {
    const slotDoc = await transaction.get(slotRef);

    if (slotDoc.exists()) {
      transaction.update(slotRef, {
        booked: false,
        lockedUntil: null,
        updatedAt: serverTimestamp(),
      });
    }

    transaction.update(appointmentRef, {
      status: "cancelled",
      updatedAt: serverTimestamp(),
    });
  });
};

/* RESCHEDULE */

export const rescheduleAppointmentService = async (
  appointment,
  newDate,
  newTime,
) => {
  const oldSlotRef = doc(db, "appointmentSlots", appointment.slotId);

  const newSlotId = `${appointment.doctorId}_${newDate}_${newTime}`;
  const newSlotRef = doc(db, "appointmentSlots", newSlotId);

  const appointmentRef = doc(db, "appointments", appointment.id);

  await runTransaction(db, async (transaction) => {
    const newSlotDoc = await transaction.get(newSlotRef);

    if (newSlotDoc.exists() && newSlotDoc.data().booked) {
      throw new Error("Selected slot is already booked");
    }

    const oldSlotDoc = await transaction.get(oldSlotRef);

    if (oldSlotDoc.exists()) {
      transaction.update(oldSlotRef, {
        booked: false,
        lockedUntil: null,
        updatedAt: serverTimestamp(),
      });
    }

    transaction.set(
      newSlotRef,
      {
        doctorId: appointment.doctorId,
        date: newDate,
        time: newTime,
        booked: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    transaction.update(appointmentRef, {
      date: newDate,
      time: newTime,
      slotId: newSlotId,
      status: "rescheduled",
      updatedAt: serverTimestamp(),
    });
  });
};

/* ADMIN REALTIME */

export const subscribeAppointmentsService = (callback) => {
  const q = query(appointmentsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    callback(data);
  });
};

/* USER REALTIME */

export const subscribeUserAppointmentsService = (userId, callback) => {
  const q = query(
    appointmentsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    callback(data);
  });
};

/* DOCTOR SLOT LISTENER */

export const subscribeDoctorSlotsService = (doctorId, date, callback) => {
  const q = query(
    slotsRef,
    where("doctorId", "==", doctorId),
    where("date", "==", date),
    where("booked", "==", true),
  );

  return onSnapshot(q, (snap) => {
    const bookedSlots = snap.docs.map((d) => d.data().time);

    callback(bookedSlots);
  });
};
