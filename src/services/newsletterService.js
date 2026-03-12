import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const ref = collection(db, "newsletter_subscribers");

export const insertSubscriber = async (email, source) => {
  const q = query(ref, where("email", "==", email));
  const snap = await getDocs(q);

  if (!snap.empty) throw new Error("Already subscribed");

  return addDoc(ref, {
    email,
    source,
    createdAt: serverTimestamp(),
  });
};
