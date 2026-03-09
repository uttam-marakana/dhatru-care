import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";

import { db } from "../firebase";

/* ------------------------------------------------ */
/* COLLECTION REFERENCES */
/* ------------------------------------------------ */

const appointmentsRef = collection(db, "appointments");

/* ------------------------------------------------ */
/* CREATE APPOINTMENT (DOUBLE BOOKING SAFE) */
/* ------------------------------------------------ */

export const createAppointment = async (data) => {
  if (!data?.doctorId || !data?.date || !data?.time || !data?.userId) {
    throw new Error("Missing appointment data");
  }

  try {
    const slotId = `${data.doctorId}_${data.date}_${data.time}`;

    const slotRef = doc(db, "appointmentSlots", slotId);
    const appointmentRef = doc(appointmentsRef);

    await runTransaction(db, async (transaction) => {
      const slotDoc = await transaction.get(slotRef);

      /* prevent double booking */
      if (slotDoc.exists() && slotDoc.data().booked === true) {
        throw new Error("This slot is already booked");
      }

      /* lock slot */
      transaction.set(slotRef, {
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        booked: true,
        updatedAt: serverTimestamp(),
      });

      /* create appointment */
      transaction.set(appointmentRef, {
        ...data,
        slotId,
        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    return appointmentRef.id;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

/* ------------------------------------------------ */
/* UPDATE APPOINTMENT STATUS */
/* ------------------------------------------------ */

export const updateAppointmentStatus = async (appointmentId, status) => {
  if (!appointmentId || !status) {
    throw new Error("Invalid appointment update");
  }

  try {
    await updateDoc(doc(db, "appointments", appointmentId), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};

/* ------------------------------------------------ */
/* CANCEL APPOINTMENT */
/* ------------------------------------------------ */

export const cancelAppointment = async (appointment) => {
  const appointmentRef = doc(db, "appointments", appointment.id);
  const slotRef = doc(db, "appointmentSlots", appointment.slotId);

  try {
    await runTransaction(db, async (transaction) => {
      transaction.update(appointmentRef, {
        status: "cancelled",
        updatedAt: serverTimestamp(),
      });

      /* free the slot again */
      transaction.update(slotRef, {
        booked: false,
      });
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
};

/* ------------------------------------------------ */
/* USER APPOINTMENTS (REALTIME LISTENER) */
/* ------------------------------------------------ */

export const subscribeUserAppointments = (userId, callback) => {
  if (!userId) return () => {};

  try {
    const q = query(
      appointmentsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"), // requires index
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const appointments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        callback(appointments);
      },
      (error) => {
        console.error("User appointments listener error:", error);
        callback([]); // prevent UI freeze
      },
    );

    return unsubscribe;
  } catch (error) {
    console.error("Subscription error:", error);
    return () => {};
  }
};

/* ------------------------------------------------ */
/* ADMIN APPOINTMENTS */
/* ------------------------------------------------ */

export const subscribeAppointments = (callback) => {
  const q = query(appointmentsRef, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const appointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(appointments);
    },
    (error) => {
      console.error("Appointments listener error:", error);
      callback([]);
    },
  );

  return unsubscribe;
};
