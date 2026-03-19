import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const migrateSlots = async () => {
  const snap = await getDocs(collection(db, "appointmentSlots"));

  for (const d of snap.docs) {
    const data = d.data();

    if (data.booked !== undefined) {
      await updateDoc(doc(db, "appointmentSlots", d.id), {
        isBooked: data.booked,
        isLocked: false,
      });
    }
  }

  console.log("✅ Migration complete");
};
