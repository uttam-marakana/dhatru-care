import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--bg)">
        <p className="text-[var(--text-secondary)]">
          Please login to view profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--bg) py-10 px-4">
      <div className="max-w-3xl mx-auto bg-(--card) rounded-2xl shadow border border-(--border) p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-(--color-primary)/10 flex items-center justify-center">
            <FaUserCircle size={40} className="text-[var(--color-primary)]" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-(--text)">
              {user.displayName || "User Profile"}
            </h1>
            <p className="text-sm text-(--muted)">
              Manage your account details
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-(--surface)">
            <p className="text-sm text-(--muted) mb-1">Full Name</p>
            <p className="font-medium text-(--text)">
              {user.displayName || "Not provided"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-(--surface) flex items-center gap-3">
            <FaEnvelope className="text-(--muted)" />
            <div>
              <p className="text-sm text-(--muted)">Email</p>
              <p className="font-medium text-(--text)">{user.email}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-(--surface)">
            <p className="text-sm text-(--muted) mb-1">User ID</p>
            <p className="text-sm break-all text-[var(--text-secondary)]">
              {user.uid}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
