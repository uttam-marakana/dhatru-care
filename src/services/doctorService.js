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
  limit,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const ref = collection(db, "doctors");

/* FETCH DOCTORS */

export const fetchDoctors = async (filters = {}) => {
  const constraints = [];

  if (filters.specialty) {
    constraints.push(where("specialty", "==", filters.specialty));
  }

  if (filters.department) {
    constraints.push(where("department", "==", filters.department));
  }

  constraints.push(limit(50));

  const q = constraints.length ? query(ref, ...constraints) : ref;

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

/* FETCH SINGLE DOCTOR */

export const fetchDoctorById = async (id) => {
  const snap = await getDoc(doc(db, "doctors", id));

  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

/* CREATE DOCTOR */

export const insertDoctor = async (data) =>
  addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

/* UPDATE DOCTOR */

export const modifyDoctor = async (id, data) =>
  updateDoc(doc(db, "doctors", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

/* DELETE DOCTOR */

export const removeDoctor = async (id) => deleteDoc(doc(db, "doctors", id));
