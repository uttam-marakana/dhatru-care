import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
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

    //  analytics + future SaaS tracking
    isRead: false,
    repliedAt: null,
    tenantId: data.tenantId || null,

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

/* --- UPDATE (GENERIC CRM) ----------- */
export const updateMessageMeta = async (id, payload) => {
  const docRef = doc(db, "contact_messages", id);

  await updateDoc(docRef, {
    ...payload,

    //  auto tracking
    ...(payload.status === "read" && { isRead: true }),

    ...(payload.status === "replied" && {
      repliedAt: serverTimestamp(),
      isLocked: true,
    }),

    updatedAt: serverTimestamp(),
  });
};
