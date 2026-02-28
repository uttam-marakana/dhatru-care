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

// GET ALL
export const getBlogPosts = async () => {
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// GET BY SLUG
export const getBlogBySlug = async (slug) => {
  const q = query(ref, where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};

// CREATE
export const createBlogPost = async (data) => {
  return await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

// UPDATE
export const updateBlogPost = async (id, data) => {
  return await updateDoc(doc(db, "blog_posts", id), data);
};

// DELETE
export const deleteBlogPost = async (id) => {
  return await deleteDoc(doc(db, "blog_posts", id));
};
