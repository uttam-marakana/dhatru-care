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
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const ref = collection(db, "doctors");

/* FETCH DOCTORS */

export const fetchDoctors = async (filters = {}) => {
  const constraints = [];

  if (filters.specialtyExact) {
    constraints.push(where("specialty", "==", filters.specialtyExact));
  }

  if (filters.department) {
    constraints.push(where("departmentId", "==", filters.department));
  }

  constraints.push(orderBy("createdAt", "desc"));
  constraints.push(limit(200));

  const q = query(ref, ...constraints);

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

/* CREATE */

export const insertDoctor = async (data) =>
  addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

/* UPDATE */

export const modifyDoctor = async (id, data) =>
  updateDoc(doc(db, "doctors", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

/* DELETE */

export const removeDoctor = async (id) => deleteDoc(doc(db, "doctors", id));
