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

  /* LOADING STATE */
  if (status === "loading") {
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
