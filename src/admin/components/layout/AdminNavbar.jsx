import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaMoon, FaSun, FaUser } from "react-icons/fa";

export default function AdminNavbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  /* --- INIT THEME  ----------- */

  useEffect(() => {
    const root = document.documentElement;
    setDark(root.classList.contains("dark"));
  }, []);

  /* --- CLOSE MENU OUTSIDE CLICK  ----------- */

  useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  /* --- TOGGLE THEME  ----------- */

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

  /* --- LOGOUT  ----------- */

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
      {/* --- LEFT SIDE ----------- */}

      <div className="flex items-center gap-3">
        {/* --- MOBILE SIDEBAR BUTTON ----------- */}

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

        {/* --- TITLE ----------- */}

        <h1 className="font-semibold text-lg gradient-heading">
          Dhatru Care Admin
        </h1>
      </div>

      {/* --- RIGHT SIDE ----------- */}

      <div className="flex items-center gap-4 sm:gap-6">
        {/* --- THEME TOGGLE ----------- */}

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

        {/* --- USER EMAIL ----------- */}

        <span className="hidden md:block text-sm text-[var(--text-secondary)]">
          {user?.email}
        </span>

        {/* --- ACCOUNT MENU ----------- */}

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="
              w-9 h-9
              rounded-full
              bg-[var(--card)]
              flex items-center justify-center
              hover:bg-[var(--surface)]
              interactive
            "
          >
            <FaUser />
          </button>

          {menuOpen && (
            <div
              className="
                absolute right-0 mt-3
                w-44
                glass
                rounded-xl
                border border-[var(--border)]
                shadow-lg
                overflow-hidden
              "
            >
              {/* --- PROFILE ----------- */}

              <button
                onClick={() => {
                  navigate("/admin/profile");
                  setMenuOpen(false);
                }}
                className="
                  w-full text-left
                  px-4 py-3
                  hover:bg-[var(--card)]
                  text-sm
                "
              >
                Profile
              </button>

              {/* --- LOGOUT ----------- */}

              <button
                onClick={handleLogout}
                className="
                  w-full text-left
                  px-4 py-3
                  hover:bg-[var(--card)]
                  text-sm
                  text-[var(--color-error)]
                  flex items-center gap-2
                "
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* --- ORIGINAL LOGOUT (kept for compatibility) ----------- */}

        <button
          onClick={handleLogout}
          className="
            hidden sm:flex
            items-center gap-2
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
