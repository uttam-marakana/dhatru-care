import { lazy } from "react";
import { FaCog } from "react-icons/fa";

const ThemeToggle = lazy(() => import("../components/common/ThemeToggle"));

export default function Settings() {
  return (
    <div className="min-h-screen bg-(--bg) py-10 px-4">
      <div className="max-w-3xl mx-auto bg-(--card) rounded-2xl shadow border border-(--border) p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaCog className="text-(--color-primary)" size={22} />
          <h1 className="text-xl font-semibold text-(--text)">Settings</h1>
        </div>

        <div className="p-4 rounded-xl bg-(--surface) flex items-center justify-between">
          <div>
            <p className="font-medium text-(--text)">Appearance</p>
            <p className="text-sm text-(--muted)">
              Switch between light and dark mode
            </p>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
