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

// CREATE BOOKING
export const createAppointment = async (data) => {
  return await addDoc(ref, {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};

// GET ALL (admin / dashboard use)
export const getAppointments = async () => {
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// UPDATE STATUS
export const updateAppointmentStatus = async (id, status) => {
  return await updateDoc(doc(db, "appointments", id), { status });
};
