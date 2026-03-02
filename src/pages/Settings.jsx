import { lazy } from "react";
import { FaCog } from "react-icons/fa";

// Dynamic imports for code splitting
const ThemeToggle = lazy(() => import("../components/common/ThemeToggle"));

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaCog className="text-primary" size={22} />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Settings
          </h1>
        </div>

        {/* Theme */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Appearance
            </p>
            <p className="text-sm text-gray-500">
              Switch between light and dark mode
            </p>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
