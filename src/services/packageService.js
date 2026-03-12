import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const ref = collection(db, "packages");

export const fetchPackages = async () => {
  const q = query(ref, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const insertPackage = async (data) =>
  addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

export const modifyPackage = async (id, data) =>
  updateDoc(doc(db, "packages", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

export const removePackage = async (id) => deleteDoc(doc(db, "packages", id));
