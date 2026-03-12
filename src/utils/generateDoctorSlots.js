import { doc, writeBatch } from "firebase/firestore";

import { db } from "../firebase";
import { generateSlots, isLeaveDate } from "./generateSlots";

const BATCH_LIMIT = 450;

export const generateDoctorSlots = async (doctor, daysAhead = 30) => {
  const today = new Date();

  let batch = writeBatch(db);
  let operationCount = 0;

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const day = date.getDay();

    if (!doctor?.workingDays?.includes(day)) continue;

    if (isLeaveDate(doctor, date)) continue;

    const dateString = date.toISOString().split("T")[0];

    const slots = generateSlots(
      doctor.startHour,
      doctor.endHour,
      doctor.slotDuration,
    );

    for (const slot of slots) {
      const slotId = `${doctor.id}_${dateString}_${slot}`;

      const ref = doc(db, "appointmentSlots", slotId);

      batch.set(
        ref,
        {
          doctorId: doctor.id,
          date: dateString,
          time: slot,
          booked: false,
        },
        { merge: true },
      );

      operationCount++;

      if (operationCount >= BATCH_LIMIT) {
        await batch.commit();

        batch = writeBatch(db);
        operationCount = 0;
      }
    }
  }

  if (operationCount > 0) {
    await batch.commit();
  }
};
