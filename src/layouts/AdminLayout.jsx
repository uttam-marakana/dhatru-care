import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const adminName = localStorage.getItem("adminName") || "Admin";

  /* GREETING LOGIC */

  const hour = new Date().getHours();
  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  const linkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-[var(--color-primary)] text-white"
        : "text-[var(--text-secondary)] hover:bg-[var(--card)]"
    }`;

  /* CLOSE DROPDOWN WHEN CLICK OUTSIDE */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* LOGOUT */

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      {/* MOBILE OVERLAY */}

      {open && (
        <div
          className="fixed inset-0 bg-[var(--bg)]/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 z-40
        bg-[var(--surface)]
        border-r border-[var(--border)]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4 flex justify-between items-center lg:hidden border-b border-[var(--border)]">
          <h2 className="font-bold text-[var(--text)]">Dhatru Care Admin</h2>

          <button
            onClick={() => setOpen(false)}
            className="text-[var(--text-secondary)] hover:text-[var(--color-primary)]"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <p className="text-xs text-[var(--text-secondary)] uppercase px-2 pt-2">
            Management
          </p>

          <NavLink to="/admin" end className={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/doctors" className={linkStyle}>
            Doctors
          </NavLink>

          <NavLink to="/admin/appointments" className={linkStyle}>
            Appointments
          </NavLink>

          <NavLink to="/admin/departments" className={linkStyle}>
            Departments
          </NavLink>

          <NavLink to="/admin/blogs" className={linkStyle}>
            Blogs
          </NavLink>

          <NavLink to="/admin/packages" className={linkStyle}>
            Packages
          </NavLink>

          <p className="text-xs text-[var(--text-secondary)] uppercase px-2 pt-6">
            Tools
          </p>

          <NavLink to="/admin/upload" className={linkStyle}>
            Data Upload
          </NavLink>

          <NavLink to="/admin/bulk-upload" className={linkStyle}>
            Bulk Upload
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* TOP BAR */}

        <div className="flex items-center justify-between mb-6 relative z-20">
          {/* MOBILE MENU */}

          <button
            onClick={() => setOpen(true)}
            className="
            lg:hidden p-2 rounded-lg
            bg-[var(--color-primary)]
            hover:bg-[var(--color-primary-hover)]
            text-white
            shadow-[0_0_12px_var(--glow-soft)]
            transition
            "
          >
            <FaBars />
          </button>

          {/* USER INFO */}

          <div
            className="relative ml-auto flex items-center gap-3"
            ref={dropdownRef}
          >
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-[var(--text-secondary)]">
                {greeting}
              </span>

              <span className="text-sm font-semibold text-[var(--text)]">
                {adminName}
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[var(--text)] hover:text-[var(--color-primary)] transition"
            >
              <FaUserCircle size={30} />
            </button>

            {/* DROPDOWN */}

            {menuOpen && (
              <div
                className="
                absolute
                right-0
                top-full
                mt-2
                w-48
                glass
                border border-[var(--border)]
                rounded-xl
                shadow-lg
                overflow-hidden
                z-50
                animate-fadeIn
                "
              >
                <button
                  onClick={() => navigate("/admin/profile")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-[var(--card)] transition"
                >
                  <FaUser /> Profile
                </button>

                <button
                  onClick={() => navigate("/admin/settings")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-[var(--card)] transition"
                >
                  <FaCog /> Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PAGE CONTENT */}

        <Outlet />
      </main>
    </div>
  );
}
