import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-[var(--color-primary)] text-white"
        : "text-[var(--text-secondary)] hover:bg-[var(--card)]"
    }`;

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
        {/* MOBILE HEADER */}

        <div className="p-4 flex justify-between items-center lg:hidden border-b border-[var(--border)]">
          <h2 className="font-bold text-[var(--text)]">Dhatru Care Admin</h2>

          <button
            onClick={() => setOpen(false)}
            className="text-[var(--text-secondary)] hover:text-[var(--color-primary)]"
          >
            <FaTimes />
          </button>
        </div>

        {/* NAVIGATION */}

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

      {/* CONTENT AREA */}

      <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() => setOpen(true)}
          className="
          lg:hidden mb-4 p-2 rounded-lg
          bg-[var(--color-primary)]
          hover:bg-[var(--color-primary-hover)]
          text-white
          shadow-[0_0_12px_var(--glow-soft)]
          transition
          "
        >
          <FaBars />
        </button>

        <Outlet />
      </main>
    </div>
  );
}
