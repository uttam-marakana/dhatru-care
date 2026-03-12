import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const createUserProfile = async (uid, data) => {
  await setDoc(doc(db, "users", uid), {
    uid,
    ...data,
    role: data.role || "user",
    createdAt: serverTimestamp(),
  });
};

export const fetchUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};
