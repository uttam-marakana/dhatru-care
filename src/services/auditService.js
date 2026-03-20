import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const logAdminAction = async (action) => {
  try {
    await addDoc(collection(db, "auditLogs"), {
      ...action,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Audit log failed:", err);
  }
};
