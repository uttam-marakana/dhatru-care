import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "contact_messages");

export const createContactMessage = async (data) => {
  try {
    return await addDoc(ref, {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Contact API Error:", err);
    throw err;
  }
};
