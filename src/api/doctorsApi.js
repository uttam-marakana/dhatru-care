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

// GET ALL (filters supported)
export const getDoctors = async (filters = {}) => {
  let q = doctorsRef;

  if (filters.specialty) {
    q = query(q, where("specialty", "==", filters.specialty));
  }

  const snap = await getDocs(q);
  let data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  if (filters.search) {
    data = data.filter((d) =>
      d.name?.toLowerCase().includes(filters.search.toLowerCase()),
    );
  }

  if (filters.experience) {
    data = data.filter((d) => d.experience?.includes(filters.experience));
  }

  return data;
};

// GET SINGLE
export const getDoctorById = async (id) => {
  const snap = await getDoc(doc(db, "doctors", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

// CREATE
export const createDoctor = async (doctor) => {
  return await addDoc(doctorsRef, {
    ...doctor,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// UPDATE
export const updateDoctor = async (id, data) => {
  return await updateDoc(doc(db, "doctors", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// DELETE
export const deleteDoctor = async (id) => {
  return await deleteDoc(doc(db, "doctors", id));
};
