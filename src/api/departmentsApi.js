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

const departmentsRef = collection(db, "departments");

/* ------------------------------------------------ */
/* GET ALL DEPARTMENTS (WITH OPTIONAL FILTERS) */
/* ------------------------------------------------ */

export const getAllDepartments = async (filters = {}) => {
  try {
    const constraints = [];

    if (filters.type) {
      constraints.push(where("type", "==", filters.type));
    }

    const q =
      constraints.length > 0
        ? query(departmentsRef, ...constraints)
        : departmentsRef;

    const snap = await getDocs(q);

    let data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    /* CLIENT SIDE SEARCH */

    if (filters.search?.trim()) {
      const search = filters.search.toLowerCase();

      data = data.filter(
        (d) =>
          d.name?.toLowerCase().includes(search) ||
          d.shortDesc?.toLowerCase().includes(search),
      );
    }

    return data;
  } catch (err) {
    console.error("Departments fetch error:", err);
    throw err;
  }
};

/* ------------------------------------------------ */
/* SIMPLE VERSION USED BY APPOINTMENT FORM */
/* ------------------------------------------------ */

export const getDepartments = async () => {
  return await getAllDepartments();
};

/* ------------------------------------------------ */
/* GET DEPARTMENT BY SLUG */
/* ------------------------------------------------ */

export const getDepartmentBySlug = async (slug) => {
  try {
    const q = query(departmentsRef, where("slug", "==", slug));

    const snap = await getDocs(q);

    if (snap.empty) return null;

    const d = snap.docs[0];

    return {
      id: d.id,
      ...d.data(),
    };
  } catch (err) {
    console.error("Department fetch error:", err);
    throw err;
  }
};

/* ------------------------------------------------ */
/* CREATE DEPARTMENT */
/* ------------------------------------------------ */

export const createDepartment = async (data) => {
  return await addDoc(departmentsRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* ------------------------------------------------ */
/* UPDATE DEPARTMENT */
/* ------------------------------------------------ */

export const updateDepartment = async (id, data) => {
  return await updateDoc(doc(db, "departments", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/* ------------------------------------------------ */
/* DELETE DEPARTMENT */
/* ------------------------------------------------ */

export const deleteDepartment = async (id) => {
  return await deleteDoc(doc(db, "departments", id));
};
