import { useState } from "react";

import BlogForm from "../components/forms/BlogForm";
import DepartmentForm from "../components/forms/DepartmentForm";
import DoctorForm from "../components/forms/DoctorForm";
import PackageForm from "../components/forms/PackageForm";

import AdminHeader from "../components/layout/AdminHeader";

const tabs = [
  { key: "doctors", label: "Doctors" },
  { key: "departments", label: "Departments" },
  { key: "packages", label: "Packages" },
  { key: "blogs", label: "Blogs" },
];

export default function DataUpload() {
  const [active, setActive] = useState("doctors");

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Admin Data Upload"
        description="Create hospital data"
      />

      <div className="flex gap-3 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className="
            px-4 py-2
            border
            rounded-lg
            "
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === "doctors" && <DoctorForm />}

      {active === "departments" && <DepartmentForm />}

      {active === "packages" && <PackageForm />}

      {active === "blogs" && <BlogForm />}
    </div>
  );
}
