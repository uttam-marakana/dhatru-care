import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("loading");
  // loading | allowed | denied

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("denied");
        return;
      }

      try {
        // fetch user role from firestore
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists() && snap.data().role === "admin") {
          setStatus("allowed");
        } else {
          setStatus("denied");
        }
      } catch (err) {
        console.error(err);
        setStatus("denied");
      }
    });

    return () => unsub();
  }, []);

  // loading screen
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        Checking access...
      </div>
    );
  }

  // blocked users
  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  // admin allowed
  return children;
}
