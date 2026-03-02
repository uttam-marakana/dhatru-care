import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          setStatus("denied");
          return;
        }

        const snap = await getDoc(doc(db, "users", user.uid));

        console.log("ADMIN CHECK:", snap.data());

        if (snap.exists() && snap.data()?.role === "admin") {
          setStatus("allowed");
        } else {
          setStatus("denied");
        }
      } catch (err) {
        console.error("Admin check error:", err);
        setStatus("denied");
      }
    });

    return () => unsubscribe();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
        Checking admin access...
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  return children;
}
