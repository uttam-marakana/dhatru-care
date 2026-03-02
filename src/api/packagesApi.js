import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "packages");

/* ===============================
   GET ALL PACKAGES
================================= */
export const getPackages = async () => {
  try {
    const q = query(ref, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (err) {
    console.error("Packages fetch error:", err);
    throw err;
  }
};

/* ===============================
   CREATE
================================= */
export const createPackage = async (data) => {
  return await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* ===============================
   UPDATE
================================= */
export const updatePackage = async (id, data) => {
  return await updateDoc(doc(db, "packages", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/* ===============================
   DELETE
================================= */
export const deletePackage = async (id) => {
  return await deleteDoc(doc(db, "packages", id));
};
