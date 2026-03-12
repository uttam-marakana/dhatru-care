import { doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const getSlotRef = (doctorId, date, time) =>
  doc(db, "appointmentSlots", `${doctorId}_${date}_${time}`);

export const buildSlotId = (doctorId, date, time) =>
  `${doctorId}_${date}_${time}`;
