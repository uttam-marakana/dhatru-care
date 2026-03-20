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

/* ------ 🔍 FETCH ALL DEPARTMENTS ------ */

export const fetchDepartments = async (filters = {}, tenantId = null) => {
  try {
    const constraints = [];

    // 🔥 TENANT SAFETY
    if (tenantId) {
      constraints.push(where("tenantId", "==", tenantId));
    }

    // 🔎 EXISTING FILTER
    if (filters.type) {
      constraints.push(where("type", "==", filters.type));
    }

    const q = constraints.length ? query(ref, ...constraints) : ref;

    const snap = await getDocs(q);

    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (err) {
    console.error("❌ fetchDepartments error:", err);
    return []; // 🔥 prevent UI crash
  }
};

/* ------ 🔍 FETCH BY SLUG ------ */

export const fetchDepartmentBySlug = async (slug, tenantId = null) => {
  try {
    const constraints = [where("slug", "==", slug)];

    if (tenantId) {
      constraints.push(where("tenantId", "==", tenantId));
    }

    const q = query(ref, ...constraints);
    const snap = await getDocs(q);

    if (snap.empty) return null;

    const d = snap.docs[0];

    return {
      id: d.id,
      ...d.data(),
    };
  } catch (err) {
    console.error("❌ fetchDepartmentBySlug error:", err);
    return null;
  }
};

/* ------ ➕ CREATE ------ */

export const insertDepartment = async (data, tenantId = null) => {
  try {
    return await addDoc(ref, {
      ...data,

      // 🔥 REQUIRED FOR RULES
      tenantId: tenantId || data?.tenantId || "default",

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("❌ insertDepartment error:", err);
    throw err;
  }
};

/* ------ ✏️ UPDATE ------ */

export const modifyDepartment = async (id, data) => {
  try {
    return await updateDoc(doc(db, "departments", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("❌ modifyDepartment error:", err);
    throw err;
  }
};

/* ------ ❌ DELETE ------ */

export const removeDepartment = async (id) => {
  try {
    return await deleteDoc(doc(db, "departments", id));
  } catch (err) {
    console.error("❌ removeDepartment error:", err);
    throw err;
  }
};
