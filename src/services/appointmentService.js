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
} from "firebase/firestore";

import { db } from "../firebase";

const appointmentsRef = collection(db, "appointments");

/* CREATE APPOINTMENT */

export const createAppointmentTransaction = async (data) => {
  const slotId = `${data.doctorId}_${data.date}_${data.time}`;

  const slotRef = doc(db, "appointmentSlots", slotId);
  const appointmentRef = doc(appointmentsRef);

  await runTransaction(db, async (transaction) => {
    const slotDoc = await transaction.get(slotRef);

    if (slotDoc.exists() && slotDoc.data().booked) {
      throw new Error("This slot is already booked");
    }

    transaction.set(
      slotRef,
      {
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        booked: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    transaction.set(appointmentRef, {
      ...data,
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
  await updateDoc(doc(db, "appointments", appointmentId), {
    status,
    updatedAt: serverTimestamp(),
  });
};

/* CANCEL APPOINTMENT */

export const cancelAppointmentService = async (appointmentId, slotId) => {
  const slotRef = doc(db, "appointmentSlots", slotId);
  const appointmentRef = doc(db, "appointments", appointmentId);

  await runTransaction(db, async (transaction) => {
    transaction.update(slotRef, {
      booked: false,
      updatedAt: serverTimestamp(),
    });

    transaction.update(appointmentRef, {
      status: "cancelled",
      updatedAt: serverTimestamp(),
    });
  });
};

/* RESCHEDULE APPOINTMENT */

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
      throw new Error("New slot already booked");
    }

    /* free old slot */

    transaction.update(oldSlotRef, {
      booked: false,
      updatedAt: serverTimestamp(),
    });

    /* book new slot */

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

    /* update appointment */

    transaction.update(appointmentRef, {
      date: newDate,
      time: newTime,
      slotId: newSlotId,
      status: "rescheduled",
      updatedAt: serverTimestamp(),
    });
  });
};

/* ADMIN APPOINTMENTS SUBSCRIBE */

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

/* USER APPOINTMENTS */

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

/* DOCTOR SLOT SUBSCRIBE */

export const subscribeDoctorSlotsService = (doctorId, date, callback) => {
  const q = query(
    collection(db, "appointmentSlots"),
    where("doctorId", "==", doctorId),
    where("date", "==", date),
    where("booked", "==", true),
  );

  return onSnapshot(q, (snap) => {
    const booked = snap.docs.map((d) => d.data().time);
    callback(booked);
  });
};
