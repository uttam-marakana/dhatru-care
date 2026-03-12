import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "contact_messages");

export const insertContactMessage = async (data) =>
  addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  });
