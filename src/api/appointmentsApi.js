import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "appointments");

export const createAppointment = async (data) => {
  try {
    return await addDoc(ref, {
      ...data,
      status: "pending",
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Appointment API Error:", err);
    throw err;
  }
};

export const getAppointments = async () => {
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateAppointmentStatus = async (id, status) => {
  return await updateDoc(doc(db, "appointments", id), {
    status,
    updatedAt: serverTimestamp(),
  });
};
