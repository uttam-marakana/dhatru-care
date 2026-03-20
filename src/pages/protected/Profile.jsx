import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        return;
      }

      setUser(u);

      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      }
    });

    return () => unsub();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">
          Please login to view profile
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--section)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* --- PROFILE CARD ----------- */}

        <div
          className="
            bg-[var(--card)]
            border border-[var(--border)]
            rounded-2xl
            p-8
            shadow-lg
            hover-lift
            animate-fade-in-up
          "
        >
          {/* --- HEADER ----------- */}

          <div className="flex items-center gap-4 mb-8">
            <div
              className="
                w-16 h-16
                flex items-center justify-center
                rounded-full
                bg-[var(--color-primary)]/10
              "
            >
              <FaUserCircle size={42} className="text-[var(--color-primary)]" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold gradient-heading">
                {profile.name}
              </h1>

              <p className="text-sm text-[var(--text-secondary)]">
                Patient Account Details
              </p>
            </div>
          </div>

          {/* --- TABLE ----------- */}

          <div className="overflow-x-auto">
            <table className="w-full border border-[var(--border)] rounded-xl overflow-hidden">
              <tbody className="divide-y divide-[var(--divider)]">
                <tr className="bg-[var(--surface)]">
                  <td className="p-4 text-[var(--muted)] w-1/3">Full Name</td>

                  <td className="p-4 font-medium">{profile.name}</td>
                </tr>

                <tr>
                  <td className="p-4 text-[var(--muted)]">Email</td>

                  <td className="p-4 font-medium">{profile.email}</td>
                </tr>

                <tr className="bg-[var(--surface)]">
                  <td className="p-4 text-[var(--muted)]">Phone</td>

                  <td className="p-4 font-medium">{profile.phone}</td>
                </tr>

                <tr>
                  <td className="p-4 text-[var(--muted)]">Gender</td>

                  <td className="p-4 font-medium capitalize">
                    {profile.gender}
                  </td>
                </tr>

                <tr className="bg-[var(--surface)]">
                  <td className="p-4 text-[var(--muted)]">Date of Birth</td>

                  <td className="p-4 font-medium">{profile.dob}</td>
                </tr>

                <tr>
                  <td className="p-4 text-[var(--muted)]">Address</td>

                  <td className="p-4 font-medium">{profile.address}</td>
                </tr>

                <tr className="bg-[var(--surface)]">
                  <td className="p-4 text-[var(--muted)]">User ID</td>

                  <td className="p-4 text-sm break-all text-[var(--text-secondary)]">
                    {profile.uid}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
