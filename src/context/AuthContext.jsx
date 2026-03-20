import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tenantId, setTenantId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setLoading(true);

        if (!firebaseUser) {
          setUser(null);
          setRole(null);
          setName(null);
          setLoading(false);
          return;
        }

        setUser(firebaseUser);

        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);

        let userRole = "user";

        if (snap.exists()) {
          const data = snap.data();
          userRole = data.role ?? "user";

          setName(data.name ?? "User");
          setTenantId(data.tenantId || "default");
        }

        setRole(userRole);

        /* DEBUG LOGS */

        console.log("Auth State:", firebaseUser.email);
        console.log("Role:", userRole);
      } catch (error) {
        console.error("Auth role fetch error:", error);
        setRole("user");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn("Logout warning:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, name, tenantId, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
