import { NavLink, Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const links = [{ to: "/admin/upload", label: "Data Upload" }];

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white dark:bg-gray-900 p-5">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <nav className="space-y-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1">
        <AdminNavbar />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
