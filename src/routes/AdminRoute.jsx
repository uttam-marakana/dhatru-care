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
    };

    checkAdmin();
  }, [user]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Checking admin access...
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  return children;
}
