import { useState } from "react";

import DoctorForm from "../forms/DoctorForm";
import DepartmentForm from "../forms/DepartmentForm";
import PackageForm from "../forms/PackageForm";
import BlogForm from "../forms/BlogForm";
import AdminNavbar from "../components/AdminNavbar";

const tabs = [
  { key: "doctors", label: "Doctors" },
  { key: "departments", label: "Departments" },
  { key: "packages", label: "Packages" },
  { key: "blog", label: "Blog Posts" },
];

export default function DataUpload() {
  const [active, setActive] = useState("doctors");

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Data Upload</h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`px-4 py-2 rounded-lg border ${
                  active === t.key
                    ? "bg-primary text-white border-[var(--color-primary)]"
                    : "bg-white dark:bg-gray-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {active === "doctors" && <DoctorForm />}
          {active === "departments" && <DepartmentForm />}
          {active === "packages" && <PackageForm />}
          {active === "blog" && <BlogForm />}
        </div>
      </div>
    </>
  );
}
