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
  orderBy,
  serverTimestamp,
  limit,
  onSnapshot
} from "firebase/firestore";

import { db } from "../firebase";

const patientsRef = collection(db, "patients");

/* --- FETCH PATIENTS ----------- */
export const fetchPatients = async (filters = {}) => {
  const constraints = [];

  if (filters.name) {
    // Simple name search - enhance with full-text later
    constraints.push(where("name", ">=", filters.name));
    constraints.push(where("name", "<=", filters.name + "\uf8ff"));
  }

  if (filters.phone) {
    constraints.push(where("phone", "==", filters.phone));
  }

  constraints.push(orderBy("createdAt", "desc"));
  constraints.push(limit(100));

  const q = query(patientsRef, ...constraints);
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

/* --- FETCH SINGLE PATIENT ----------- */
export const fetchPatientById = async (id) => {
  const snap = await getDoc(doc(db, "patients", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

/* --- SEARCH BY PHONE/EMAIL ----------- */
export const searchPatient = async (identifier) => {
  const phoneQ = query(patientsRef, where("phone", "==", identifier), limit(1));
  const emailQ = query(patientsRef, where("email", "==", identifier), limit(1));

  const [phoneSnap, emailSnap] = await Promise.all([
    getDocs(phoneQ),
    getDocs(emailQ),
  ]);

  if (phoneSnap.docs.length > 0) return { id: phoneSnap.docs[0].id, ...phoneSnap.docs[0].data() };
  if (emailSnap.docs.length > 0) return { id: emailSnap.docs[0].id, ...emailSnap.docs[0].data() };

  return null;
};

/* --- CREATE PATIENT ----------- */
export const createPatient = async (data) => {
  return addDoc(patientsRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* --- UPDATE PATIENT ----------- */
export const updatePatient = async (id, data) => {
  return updateDoc(doc(db, "patients", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/* --- DELETE PATIENT ----------- */
export const deletePatient = async (id) => {
  return deleteDoc(doc(db, "patients", id));
};

/* --- REAL-TIME SUBSCRIPTION ----------- */
export const subscribePatients = (tenantId, callback) => {
  const q = query(patientsRef, orderBy("createdAt", "desc"));
  
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(data);
  });
};

export default {
  fetchPatients,
  fetchPatientById,
  searchPatient,
  createPatient,
  updatePatient,
  deletePatient,
};

