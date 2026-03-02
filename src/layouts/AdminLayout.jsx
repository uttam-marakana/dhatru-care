import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-primary text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 z-40
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* MOBILE HEADER */}
        <div className="p-4 flex justify-between items-center lg:hidden border-b dark:border-gray-800">
          <h2 className="font-bold text-gray-900 dark:text-white">Admin</h2>
          <button onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* NAV */}
        <nav className="p-4 space-y-2">
          <NavLink to="/admin/upload" className={linkStyle}>
            Data Upload
          </NavLink>

          <NavLink to="/admin/bulk-upload" className={linkStyle}>
            Bulk Upload
          </NavLink>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden mb-4 p-2 rounded bg-primary text-white"
        >
          <FaBars />
        </button>

        <Outlet />
      </main>
    </div>
  );
}
