import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });

    return () => unsub();
  }, []);

  /* LOADING STATE */
  if (user === undefined) {
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
          border-4 border-[var(--color-main)]
          border-t-transparent
          animate-spin
          "
        />

        <p>Checking authentication...</p>
      </div>
    );
  }

  /* NOT AUTHENTICATED */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
