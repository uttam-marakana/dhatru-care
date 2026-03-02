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

/* ===============================
   GET ALL DEPARTMENTS
================================= */
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

    let data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    // client search
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

/* ===============================
   GET BY SLUG
================================= */
export const getDepartmentBySlug = async (slug) => {
  try {
    const q = query(departmentsRef, where("slug", "==", slug));
    const snap = await getDocs(q);

    if (snap.empty) return null;

    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  } catch (err) {
    console.error("Department fetch error:", err);
    throw err;
  }
};

/* ===============================
   CREATE
================================= */
export const createDepartment = async (data) => {
  return await addDoc(departmentsRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* ===============================
   UPDATE
================================= */
export const updateDepartment = async (id, data) => {
  return await updateDoc(doc(db, "departments", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/* ===============================
   DELETE
================================= */
export const deleteDepartment = async (id) => {
  return await deleteDoc(doc(db, "departments", id));
};
