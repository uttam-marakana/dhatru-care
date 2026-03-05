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
} from "firebase/firestore";
import { db } from "../firebase";

const appointmentsRef = collection(db, "appointments");

/* ---------------- CREATE APPOINTMENT ---------------- */

export const createAppointment = async (data) => {
  const q = query(
    appointmentsRef,
    where("date", "==", data.date),
    where("time", "==", data.time),
    where("doctorID", "==", data.doctorID),
  );

  const snap = await getDocs(q);

  if (!snap.empty) {
    throw new Error("This time slot is already booked.");
  }

  return await addDoc(appointmentsRef, {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};

/* ---------------- UPDATE STATUS ---------------- */

export const updateAppointmentStatus = async (id, status) => {
  return await updateDoc(doc(db, "appointments", id), {
    status,
    updatedAt: serverTimestamp(),
  });
};

/* ---------------- GET USER APPOINTMENTS ---------------- */

export const getUserAppointments = async (userId) => {
  const q = query(appointmentsRef, where("userId", "==", userId));

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ---------------- REALTIME LISTENER ---------------- */

export const subscribeAppointments = (callback) => {
  return onSnapshot(appointmentsRef, (snap) => {
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });
};
