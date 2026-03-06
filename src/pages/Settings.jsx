import { lazy } from "react";
import { FaCog } from "react-icons/fa";

const ThemeToggle = lazy(() => import("../components/common/ThemeToggle"));

export default function Settings() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-[var(--card)] rounded-2xl shadow border border-[var(--border)] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaCog className="text-[var(--color-primary)]" size={22} />
          <h1 className="text-xl font-semibold text-[var(--text)]">Settings</h1>
        </div>

        <div className="p-4 rounded-xl bg-[var(--surface)] flex items-center justify-between">
          <div>
            <p className="font-medium text-[var(--text)]">Appearance</p>
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
