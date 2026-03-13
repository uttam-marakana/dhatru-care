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

/* FETCH ALL DEPARTMENTS */

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

/* FETCH DEPARTMENT BY SLUG */

export const fetchDepartmentBySlug = async (slug) => {
  const q = query(ref, where("slug", "==", slug));

  const snap = await getDocs(q);

  if (snap.empty) return null;

  const d = snap.docs[0];

  return {
    id: d.id,
    ...d.data(),
  };
};

/* CREATE */

export const insertDepartment = async (data) =>
  addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

/* UPDATE */

export const modifyDepartment = async (id, data) =>
  updateDoc(doc(db, "departments", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

/* DELETE */

export const removeDepartment = async (id) =>
  deleteDoc(doc(db, "departments", id));
