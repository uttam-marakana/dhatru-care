import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

/* LOGIN */
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/* SIGNUP */
export const signup = async (email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  // create firestore user doc
  await setDoc(doc(db, "users", res.user.uid), {
    email,
    role: "user",
    createdAt: serverTimestamp(),
  });

  return res;
};

/* LOGOUT */
export const logout = async () => {
  return await signOut(auth);
};
