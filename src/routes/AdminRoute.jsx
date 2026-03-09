import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (!user) {
          setStatus("denied");
          return;
        }

        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists() && snap.data()?.role === "admin") {
          setStatus("allowed");
        } else {
          setStatus("denied");
        }
      } catch (err) {
        console.error("Admin check error:", err);
        setStatus("denied");
      }
    };

    checkAdmin();
  }, [user]);

  /* AUTH LOADING */
  if (user === undefined || status === "loading") {
    return (
      <div
        className="
        min-h-screen flex flex-col items-center justify-center
        bg-[var(--bg)]
        text-[var(--text-secondary)]
        gap-4
        "
      >
        <div
          className="
          w-8 h-8 rounded-full
          border-4 border-[var(--color-primary)]
          border-t-transparent
          animate-spin
          "
        />

        <p>Checking admin access...</p>
      </div>
    );
  }

  /* ACCESS DENIED */
  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  return children;
}
