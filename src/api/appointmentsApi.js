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

/* ------------------------------------------------ */
/* HELPER: BUILD SLOT ID SAFELY */
/* ------------------------------------------------ */

const buildSlotId = (appointment) => {
  if (appointment?.slotId) return appointment.slotId;

  if (appointment?.doctorId && appointment?.date && appointment?.time) {
    return `${appointment.doctorId}_${appointment.date}_${appointment.time}`;
  }

  return null;
};

/* ------------------------------------------------ */
/* CREATE APPOINTMENT (DOUBLE BOOKING SAFE) */
/* ------------------------------------------------ */

export const createAppointment = async (data) => {
  if (!data?.doctorId || !data?.date || !data?.time || !data?.userId) {
    throw new Error("Missing appointment data");
  }

  const slotId = `${data.doctorId}_${data.date}_${data.time}`;

  const slotRef = doc(db, "appointmentSlots", slotId);
  const appointmentRef = doc(appointmentsRef);

  await runTransaction(db, async (transaction) => {
    const slotDoc = await transaction.get(slotRef);

    if (slotDoc.exists() && slotDoc.data().booked) {
      throw new Error("This slot is already booked");
    }

    transaction.set(slotRef, {
      doctorId: data.doctorId,
      date: data.date,
      time: data.time,
      booked: true,
      updatedAt: serverTimestamp(),
    });

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

/* ------------------------------------------------ */
/* UPDATE APPOINTMENT STATUS */
/* ------------------------------------------------ */

export const updateAppointmentStatus = async (appointmentId, status) => {
  if (!appointmentId) return;

  await updateDoc(doc(db, "appointments", appointmentId), {
    status,
    updatedAt: serverTimestamp(),
  });
};

/* ------------------------------------------------ */
/* CANCEL APPOINTMENT */
/* ------------------------------------------------ */

export const cancelAppointment = async (appointment) => {
  if (!appointment?.id) {
    throw new Error("Invalid appointment");
  }

  const appointmentRef = doc(db, "appointments", appointment.id);

  const slotId = buildSlotId(appointment);

  await runTransaction(db, async (transaction) => {
    transaction.update(appointmentRef, {
      status: "cancelled",
      updatedAt: serverTimestamp(),
    });

    if (slotId) {
      const slotRef = doc(db, "appointmentSlots", slotId);

      transaction.set(
        slotRef,
        {
          booked: false,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }
  });
};

/* ------------------------------------------------ */
/* RESCHEDULE APPOINTMENT */
/* ------------------------------------------------ */

export const rescheduleAppointment = async (appointment, newDate, newTime) => {
  if (!appointment?.id || !newDate || !newTime) {
    throw new Error("Invalid reschedule request");
  }

  const oldSlotId = buildSlotId(appointment);

  const newSlotId = `${appointment.doctorId}_${newDate}_${newTime}`;

  const appointmentRef = doc(db, "appointments", appointment.id);
  const newSlotRef = doc(db, "appointmentSlots", newSlotId);

  await runTransaction(db, async (transaction) => {
    const newSlotDoc = await transaction.get(newSlotRef);

    if (newSlotDoc.exists() && newSlotDoc.data().booked) {
      throw new Error("New slot already booked");
    }

    /* free old slot */

    if (oldSlotId) {
      const oldSlotRef = doc(db, "appointmentSlots", oldSlotId);

      transaction.set(oldSlotRef, { booked: false }, { merge: true });
    }

    /* reserve new slot */

    transaction.set(newSlotRef, {
      doctorId: appointment.doctorId,
      date: newDate,
      time: newTime,
      booked: true,
      updatedAt: serverTimestamp(),
    });

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

/* ------------------------------------------------ */
/* USER APPOINTMENTS (REALTIME) */
/* ------------------------------------------------ */

export const subscribeUserAppointments = (userId, callback) => {
  if (!userId) return () => {};

  const q = query(
    appointmentsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snapshot) => {
    const appointments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(appointments);
  });
};

/* ------------------------------------------------ */
/* ADMIN APPOINTMENTS */
/* ------------------------------------------------ */

export const subscribeAppointments = (callback) => {
  const q = query(appointmentsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const appointments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(appointments);
  });
};

/* ------------------------------------------------ */
/* GET BOOKED SLOTS FOR DOCTOR */
/* ------------------------------------------------ */

export const subscribeDoctorSlots = (doctorId, date, callback) => {
  if (!doctorId || !date) return () => {};

  const q = query(
    appointmentsRef,
    where("doctorId", "==", doctorId),
    where("date", "==", date),
  );

  return onSnapshot(q, (snapshot) => {
    const bookedSlots = snapshot.docs.map((doc) => doc.data().time);

    callback(bookedSlots);
  });
};
