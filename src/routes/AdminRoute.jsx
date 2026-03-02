import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return setStatus("denied");

      const snap = await getDoc(doc(db, "users", user.uid));
      setStatus(
        snap.exists() && snap.data().role === "admin" ? "allowed" : "denied",
      );
    });
    return () => unsub();
  }, []);

  if (status === "loading") return <div>Checking access...</div>;
  if (status === "denied") return <Navigate to="/" replace />;
  return children;
}
