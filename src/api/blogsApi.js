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

/* ===============================
   GET BLOG POSTS (FILTERED)
================================= */
export const getBlogPosts = async (filters = {}) => {
  try {
    const constraints = [];

    if (filters.category) {
      constraints.push(where("category", "==", filters.category));
    }

    const q = constraints.length ? query(ref, ...constraints) : ref;

    const snap = await getDocs(q);

    let data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    /* CLIENT SEARCH */
    if (filters.search?.trim()) {
      const term = filters.search.toLowerCase();

      data = data.filter(
        (p) =>
          p.title?.toLowerCase().includes(term) ||
          p.excerpt?.toLowerCase().includes(term) ||
          p.tags?.some((t) => t.toLowerCase().includes(term)),
      );
    }

    return data;
  } catch (err) {
    console.error("BLOG FETCH ERROR:", err);
    throw err;
  }
};

/* ===============================
   GET BY SLUG
================================= */
export const getBlogBySlug = async (slug) => {
  const q = query(ref, where("slug", "==", slug));
  const snap = await getDocs(q);

  if (snap.empty) return null;

  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};

/* ===============================
   RELATED BLOGS
================================= */
export const getRelatedBlogs = async ({ category, tags = [], limit = 3 }) => {
  try {
    const constraints = [];

    if (category) {
      constraints.push(where("category", "==", category));
    }

    const q = constraints.length ? query(ref, ...constraints) : ref;

    const snap = await getDocs(q);

    let data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    if (tags.length) {
      data = data.filter((blog) =>
        blog.tags?.some((t) =>
          tags.some((x) => x.toLowerCase() === t.toLowerCase()),
        ),
      );
    }

    return data.slice(0, limit);
  } catch (err) {
    console.error("RELATED BLOG ERROR:", err);
    return [];
  }
};

/* ===============================
   CRUD
================================= */
export const createBlogPost = async (data) => {
  return await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateBlogPost = async (id, data) => {
  return await updateDoc(doc(db, "blog_posts", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteBlogPost = async (id) => {
  return await deleteDoc(doc(db, "blog_posts", id));
};
