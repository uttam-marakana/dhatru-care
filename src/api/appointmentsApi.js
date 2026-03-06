import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  where,
  getDocs,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

const appointmentsRef = collection(db, "appointments");

/* -------- CREATE APPOINTMENT ---------- */

export const createAppointment = async (data) => {
  if (!data?.doctorID || !data?.date || !data?.time) {
    throw new Error("Missing appointment data");
  }

  const q = query(
    appointmentsRef,
    where("doctorID", "==", data.doctorID),
    where("date", "==", data.date),
    where("time", "==", data.time),
  );

  const snap = await getDocs(q);

  if (!snap.empty) {
    throw new Error("This slot is already booked");
  }

  return addDoc(appointmentsRef, {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* -------- UPDATE STATUS ---------- */

export const updateAppointmentStatus = async (id, status) => {
  return updateDoc(doc(db, "appointments", id), {
    status,
    updatedAt: serverTimestamp(),
  });
};

/* -------- USER APPOINTMENTS ---------- */

export const subscribeUserAppointments = (userId, callback) => {
  if (!userId) return;

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

/* -------- ADMIN APPOINTMENTS ---------- */

export const subscribeAppointments = (callback) => {
  const q = query(appointmentsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    callback(data);
  });
};
