import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";

export default function AdminNavbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);

  /* ---------------- INIT THEME ---------------- */

  useEffect(() => {
    const root = document.documentElement;
    setDark(root.classList.contains("dark"));
  }, []);

  /* ---------------- TOGGLE THEME ---------------- */

  const toggleTheme = () => {
    const root = document.documentElement;

    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setDark(false);
    } else {
      root.classList.add("dark");
      setDark(true);
    }
  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      className="
      glass
      sticky top-0 z-30
      flex items-center justify-between
      px-4 sm:px-6
      py-3
      mb-6
      "
    >
      {/* LEFT SIDE */}

      <div className="flex items-center gap-3">
        {/* MOBILE SIDEBAR BUTTON */}

        <button
          onClick={onMenuClick}
          className="
          lg:hidden
          p-2 rounded-lg
          hover:bg-[var(--card)]
          interactive
          "
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        {/* TITLE */}

        <h1 className="font-semibold text-lg gradient-heading">
          Dhatru Care Admin
        </h1>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-4 sm:gap-6">
        {/* THEME TOGGLE */}

        <button
          onClick={toggleTheme}
          className="
          p-2 rounded-lg
          hover:bg-[var(--card)]
          interactive
          "
          aria-label="Toggle theme"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* USER EMAIL */}

        <span className="hidden md:block text-sm text-[var(--text-secondary)]">
          {user?.email}
        </span>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="
          flex items-center gap-2
          text-sm
          text-[var(--color-error)]
          hover:text-red-600
          interactive
          "
        >
          <FaSignOutAlt />

          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
