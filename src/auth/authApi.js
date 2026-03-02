import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const ADMIN_EMAIL = "uttamrootways@gmail.com";

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signup = async (email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", res.user.uid), {
    email,
    role: email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user",
    createdAt: serverTimestamp(),
  });

  return res;
};

export const logout = () => signOut(auth);
