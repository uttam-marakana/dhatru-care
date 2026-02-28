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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please login to view profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <FaUserCircle size={40} className="text-primary" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.displayName || "User Profile"}
            </h1>
            <p className="text-sm text-gray-500">Manage your account details</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 mb-1">Full Name</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {user.displayName || "Not provided"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center gap-3">
            <FaEnvelope className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 mb-1">User ID</p>
            <p className="text-sm break-all text-gray-800 dark:text-gray-300">
              {user.uid}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
