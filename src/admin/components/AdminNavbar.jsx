import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authApi";
import { useState } from "react";

export default function AdminNavbar() {
  const nav = useNavigate();
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  };

  return (
    <div className="border-b bg-white dark:bg-gray-900 px-6 py-4 flex justify-between">
      <h1 className="font-bold">Admin Panel</h1>

      <div className="flex gap-3">
        <button onClick={toggleTheme} className="px-3 py-2 rounded border">
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          onClick={async () => {
            await logout();
            nav("/login");
          }}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
