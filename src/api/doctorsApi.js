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

/* ------------------------------------------------ */
/* GET ALL DOCTORS */
/* ------------------------------------------------ */

export const getDoctors = async (filters = {}) => {
  try {
    const constraints = [];

    if (filters.specialty) {
      constraints.push(where("specialty", "==", filters.specialty));
    }

    const q =
      constraints.length > 0 ? query(doctorsRef, ...constraints) : doctorsRef;

    const snap = await getDocs(q);

    let data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (filters.search?.trim()) {
      const search = filters.search.toLowerCase();

      data = data.filter((d) => d.name?.toLowerCase().includes(search));
    }

    return data;
  } catch (err) {
    console.error("GET DOCTORS ERROR:", err);
    throw err;
  }
};

/* ------------------------------------------------ */
/* GET DOCTORS BY DEPARTMENT (FOR APPOINTMENT FORM) */
/* ------------------------------------------------ */

export const getDoctorsByDepartment = async (departmentId) => {
  try {
    if (!departmentId) return [];

    const q = query(doctorsRef, where("departmentId", "==", departmentId));

    const snap = await getDocs(q);

    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("GET DOCTORS BY DEPARTMENT ERROR:", err);
    throw err;
  }
};

/* ------------------------------------------------ */
/* GET DOCTOR BY ID */
/* ------------------------------------------------ */

export const getDoctorById = async (id) => {
  try {
    if (!id) return null;

    const ref = doc(db, "doctors", String(id));
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data(),
    };
  } catch (err) {
    console.error("GET DOCTOR BY ID ERROR:", err);
    throw err;
  }
};

/* ------------------------------------------------ */
/* CREATE DOCTOR */
/* ------------------------------------------------ */

export const createDoctor = async (doctor) => {
  return await addDoc(doctorsRef, {
    ...doctor,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* ------------------------------------------------ */
/* UPDATE DOCTOR */
/* ------------------------------------------------ */

export const updateDoctor = async (id, data) => {
  return await updateDoc(doc(db, "doctors", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/* ------------------------------------------------ */
/* DELETE DOCTOR */
/* ------------------------------------------------ */

export const deleteDoctor = async (id) => {
  return await deleteDoc(doc(db, "doctors", id));
};
