import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const ref = collection(db, "departments");

export const fetchDepartments = async (filters = {}) => {
  const constraints = [];

  if (filters.type) {
    constraints.push(where("type", "==", filters.type));
  }

  const q = constraints.length ? query(ref, ...constraints) : ref;

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const insertDepartment = async (data) =>
  addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

export const modifyDepartment = async (id, data) =>
  updateDoc(doc(db, "departments", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

export const removeDepartment = async (id) =>
  deleteDoc(doc(db, "departments", id));
