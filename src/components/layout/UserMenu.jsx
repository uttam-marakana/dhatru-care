import { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function UserMenu() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return unsub;
  }, []);

  /* close dropdown when clicking outside */

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      {/* USER ICON */}

      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        👤
      </button>

      {/* DROPDOWN */}

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-50">
          <div className="px-4 py-2 text-sm text-gray-500 border-b">
            {user.email}
          </div>

          <Link
            to="/profile/appointments"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            My Appointments
          </Link>

          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
