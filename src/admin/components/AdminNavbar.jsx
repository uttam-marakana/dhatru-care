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

    const isDark = document.documentElement.classList.contains("dark");

    setDark(isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div
      className="
      border-b border-[var(--border)]
      bg-[var(--surface)]
      px-6 py-4
      flex justify-between items-center
    "
    >
      <h1 className="font-semibold text-lg">Admin Panel</h1>

      <div className="flex gap-3">
        <button
          onClick={toggleTheme}
          className="
            px-4 py-2 rounded-lg
            border border-[var(--border)]
            bg-[var(--card)]
            hover:bg-[var(--glow-bg)]
          "
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          onClick={async () => {
            await logout();
            nav("/login");
          }}
          className="
            px-4 py-2 rounded-lg
            bg-[var(--color-primary)]
            hover:bg-[var(--color-primary-hover)]
            text-white
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}
