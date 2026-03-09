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

const doctorsRef = collection(db, "doctors");

/* GET ALL DOCTORS */

export const getDoctors = async (filters = {}) => {
  const constraints = [];

  if (filters.specialty) {
    constraints.push(where("specialty", "==", filters.specialty));
  }

  const q =
    constraints.length > 0 ? query(doctorsRef, ...constraints) : doctorsRef;

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* GET DOCTORS BY DEPARTMENT */

export const getDoctorsByDepartment = async (departmentId) => {
  if (!departmentId) return [];

  const q = query(doctorsRef, where("departmentId", "==", departmentId));

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* GET DOCTOR BY ID */

export const getDoctorById = async (id) => {
  const ref = doc(db, "doctors", id);

  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

/* CREATE */

export const createDoctor = async (doctor) => {
  return await addDoc(doctorsRef, {
    ...doctor,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* UPDATE */

export const updateDoctor = async (id, data) => {
  return await updateDoc(doc(db, "doctors", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/* DELETE */

export const deleteDoctor = async (id) => {
  return await deleteDoc(doc(db, "doctors", id));
};
