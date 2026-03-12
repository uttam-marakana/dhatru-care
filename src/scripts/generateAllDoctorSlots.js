import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import { generateDoctorSlots } from "../utils/generateDoctorSlots";

export const generateAllDoctorSlots = async () => {
  try {
    const snap = await getDocs(collection(db, "doctors"));

    console.log(`Generating slots for ${snap.size} doctors`);

    for (const d of snap.docs) {
      try {
        const doctor = {
          id: d.id,
          ...d.data(),
        };

        await generateDoctorSlots(doctor, 30);

        console.log(`Slots generated for ${doctor.name}`);
      } catch (err) {
        console.error(`Slot generation failed for doctor ${d.id}`, err);
      }
    }

    console.log("All doctor slots generated");
  } catch (err) {
    console.error("Failed to fetch doctors", err);
  }
};
