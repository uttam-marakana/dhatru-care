import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { generateDoctorSlots } from "../utils/generateDoctorSlots";

export const generateAllDoctorSlots = async () => {
  const snap = await getDocs(collection(db, "doctors"));

  for (const d of snap.docs) {
    const doctor = { id: d.id, ...d.data() };

    await generateDoctorSlots(doctor, 30);
  }

  console.log("All doctor slots generated");
};
