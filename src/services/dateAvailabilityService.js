import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const subscribeDoctorDatesAvailability = (doctorId, callback) => {
  const q = query(
    collection(db, "appointmentSlots"),
    where("doctorId", "==", doctorId),
  );

  return onSnapshot(q, (snap) => {
    const map = {};

    snap.docs.forEach((d) => {
      const data = d.data();
      const date = data.date;

      if (!map[date]) {
        map[date] = { total: 0, booked: 0 };
      }

      map[date].total++;

      if (data.isBooked || data.booked) {
        map[date].booked++;
      }
    });

    callback(map);
  });
};
