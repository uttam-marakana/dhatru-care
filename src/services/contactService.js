import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  getDoc, // ADD
} from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "contact_messages");

/* --- CREATE ----------- */
export const insertContactMessage = async (data) => {
  return addDoc(ref, {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    phone: data.phone || "",

    status: "new",
    priority: "normal",
    notes: [],

    isRead: false,
    repliedAt: null,
    tenantId: data.tenantId || null,
    isLocked: false, // INIT

    source: data.source || "contact-page",

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* --- REALTIME ----------- */
export const subscribeContactMessages = (cb) => {
  const q = query(ref, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })),
    );
  });
};

/* --- UPDATE (LOCK SAFE) ----------- */
export const updateMessageMeta = async (id, payload) => {
  const docRef = doc(db, "contact_messages", id);

  // FETCH CURRENT STATE
  const snap = await getDoc(docRef);
  const current = snap.data();

  // BLOCK IF LOCKED
  if (current?.isLocked) {
    throw new Error("Record already finalized");
  }

  await updateDoc(docRef, {
    ...payload,

    ...(payload.status === "read" && { isRead: true }),

    ...(payload.status === "replied" && {
      repliedAt: serverTimestamp(),
    }),

    updatedAt: serverTimestamp(),
  });
};
