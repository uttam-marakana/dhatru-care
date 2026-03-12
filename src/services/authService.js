import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

export const loginUser = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

export const registerUser = async (email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};
