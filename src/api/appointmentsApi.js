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

const ref = collection(db, "appointments");

export const createAppointment = async (data) => {
  const q = query(
    ref,
    where("date", "==", data.date),
    where("time", "==", data.time),
    where("doctorID", "==", data.doctorID),
  );

  const snap = await getDocs(q);

  if (!snap.empty) {
    throw new Error("Time slot is Already booked");
  }

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

export const updateAppointmentStatus = async (id, status) => {
  return await updateDoc(doc(db, "appointments", id), {
    status,
    updatedAt: serverTimestamp(),
  });
};

/* --- Realtime Listener ----------------- */
export const subscribeAppointments = (callback) => {
  return onSnapshot(ref, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(data);
  });
};

/* --- Update Status ----------------- */
export const getAppointments = async (id, status) => {
  return await updateDoc(doc(db, "appointments", id), {
    status,
    updatedAt: serverTimestamp(),
  });
};
