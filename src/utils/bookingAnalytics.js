import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/* --- TRACK ATTEMPT ----------- */

export const trackBookingAttempt = async (data) => {
  try {
    await addDoc(collection(db, "bookingEvents"), {
      type: "attempt",
      doctorId: data.doctorId,
      departmentId: data.department,
      date: data.date,
      time: data.time,
      createdAt: serverTimestamp(),
    });
  } catch (e) {}
};

/* --- TRACK SUCCESS ----------- */

export const trackBookingSuccess = async (data) => {
  try {
    await addDoc(collection(db, "bookingEvents"), {
      type: "success",
      doctorId: data.doctorId,
      departmentId: data.department,
      date: data.date,
      time: data.time,
      createdAt: serverTimestamp(),
    });
  } catch (e) {}
};
