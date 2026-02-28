import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "contact_messages");

export const createContactMessage = async (data) => {
  return await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  });
};
