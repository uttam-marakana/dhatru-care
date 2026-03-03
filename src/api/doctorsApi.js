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

/* ------------ COLLECTION REF ---------------------------------------------- */
const doctorsRef = collection(db, "doctors");

/* ------------ GET ALL DOCTORS (WITH FILTERS)   
  - Safe for old & new docs
  - No orderBy (avoids index errors)
---------------------------------------------- */
export const getDoctors = async (filters = {}) => {
  try {
    const constraints = [];

    // Firestore-level filtering (fast)
    if (filters.specialty) {
      constraints.push(where("specialty", "==", filters.specialty));
    }

    const q =
      constraints.length > 0 ? query(doctorsRef, ...constraints) : doctorsRef;

    const snap = await getDocs(q);

    let data = snap.docs.map((d) => ({
      id: d.id, // 🔥 Firestore document ID
      ...d.data(),
    }));

    /* ------------ CLIENT-SIDE FILTERS ---------------------------------------------- */

    // Search by name
    if (filters.search?.trim()) {
      const search = filters.search.toLowerCase();
      data = data.filter((d) => d.name?.toLowerCase().includes(search));
    }

    // Experience filter
    if (filters.experience?.trim()) {
      data = data.filter((d) =>
        d.experience?.toLowerCase().includes(filters.experience.toLowerCase()),
      );
    }

    return data;
  } catch (err) {
    console.error("GET DOCTORS ERROR:", err);
    throw err;
  }
};

/* ------------ GET SINGLE DOCTOR BY FIRESTORE ID ---------------------------------------------- */
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

/* ------------ CREATE DOCTOR ---------------------------------------------- */
export const createDoctor = async (doctor) => {
  try {
    return await addDoc(doctorsRef, {
      ...doctor,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("CREATE DOCTOR ERROR:", err);
    throw err;
  }
};

/* ------------ UPDATE DOCTOR ---------------------------------------------- */
export const updateDoctor = async (id, data) => {
  try {
    return await updateDoc(doc(db, "doctors", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("UPDATE DOCTOR ERROR:", err);
    throw err;
  }
};

/* ------------ DELETE DOCTOR ---------------------------------------------- */
export const deleteDoctor = async (id) => {
  try {
    return await deleteDoc(doc(db, "doctors", id));
  } catch (err) {
    console.error("DELETE DOCTOR ERROR:", err);
    throw err;
  }
};
