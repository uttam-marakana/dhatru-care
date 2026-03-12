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

const ref = collection(db, "blog_posts");

export const fetchBlogs = async (filters = {}) => {
  const constraints = [];

  if (filters.category) {
    constraints.push(where("category", "==", filters.category));
  }

  const q = constraints.length ? query(ref, ...constraints) : ref;

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const fetchBlogBySlug = async (slug) => {
  const q = query(ref, where("slug", "==", slug));
  const snap = await getDocs(q);

  if (snap.empty) return null;

  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};

export const insertBlog = async (data) =>
  addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

export const modifyBlog = async (id, data) =>
  updateDoc(doc(db, "blog_posts", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

export const removeBlog = async (id) => deleteDoc(doc(db, "blog_posts", id));
