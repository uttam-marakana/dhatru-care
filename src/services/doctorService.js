import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const ref = collection(db, "doctors");

export const fetchDoctors = async (filters = {}) => {
  const constraints = [];

  if (filters.specialty) {
    constraints.push(where("specialty", "==", filters.specialty));
  }

  const q = constraints.length ? query(ref, ...constraints) : ref;

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const fetchDoctorById = async (id) => {
  const snap = await getDoc(doc(db, "doctors", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const insertDoctor = async (data) =>
  addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

export const modifyDoctor = async (id, data) =>
  updateDoc(doc(db, "doctors", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

export const removeDoctor = async (id) => deleteDoc(doc(db, "doctors", id));
