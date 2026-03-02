import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "newsletter_subscribers");

export const subscribeNewsletter = async (email, source) => {
  try {
    const q = query(ref, where("email", "==", email));
    const snap = await getDocs(q);

    if (!snap.empty) {
      throw new Error("Already subscribed");
    }

    return await addDoc(ref, {
      email,
      source,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Newsletter API Error:", err);
    throw err;
  }
};
