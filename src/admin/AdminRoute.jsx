import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = "uttamrootways@gmail.com";

export default function AdminRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  // loading state
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        Checking access...
      </div>
    );
  }

  // not logged in
  if (!user) return <Navigate to="/login" replace />;

  // not admin
  if (user.email !== ADMIN_EMAIL) return <Navigate to="/" replace />;

  return children;
}
