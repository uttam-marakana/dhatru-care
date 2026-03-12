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

export const createAppointmentTransaction = async (data) => {
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

export const updateAppointmentStatusService = async (appointmentId, status) => {
  await updateDoc(doc(db, "appointments", appointmentId), {
    status,
    updatedAt: serverTimestamp(),
  });
};

export const subscribeAppointmentsService = (callback) => {
  const q = query(appointmentsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })),
    );
  });
};

export const subscribeUserAppointmentsService = (userId, callback) => {
  const q = query(
    appointmentsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })),
    );
  });
};
