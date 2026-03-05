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

export const signup = async (data) => {
  const { email, password, name, phone, gender, dob, address } = data;

  const res = await createUserWithEmailAndPassword(auth, email, password);

  const role =
    email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user";

  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    name,
    email,
    phone,
    gender,
    dob,
    address,
    role,
    createdAt: serverTimestamp(),
  });

  return res.user;
};

export const logout = () => signOut(auth);
