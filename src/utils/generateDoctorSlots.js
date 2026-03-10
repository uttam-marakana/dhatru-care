import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { generateSlots } from "./generateSlots";

export const generateDoctorSlots = async (doctor, daysAhead = 30) => {
  const today = new Date();

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const day = date.getDay();

    if (!doctor.workingDays.includes(day)) continue;

    const dateString = date.toISOString().split("T")[0];

    const slots = generateSlots(
      doctor.startHour,
      doctor.endHour,
      doctor.slotDuration,
    );

    for (const slot of slots) {
      const slotId = `${doctor.id}_${dateString}_${slot}`;

      await setDoc(
        doc(db, "appointmentSlots", slotId),
        {
          doctorId: doctor.id,
          date: dateString,
          time: slot,
          booked: false,
        },
        { merge: true },
      );
    }
  }
};
