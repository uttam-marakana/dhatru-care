import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "packages");

// GET ALL
export const getPackages = async () => {
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// CREATE
export const createPackage = async (data) => {
  return await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

// UPDATE
export const updatePackage = async (id, data) => {
  return await updateDoc(doc(db, "packages", id), data);
};

// DELETE
export const deletePackage = async (id) => {
  return await deleteDoc(doc(db, "packages", id));
};
