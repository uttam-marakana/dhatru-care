import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import DepartmentForm from "../forms/DepartmentForm";

export default function DepartmentFormModal({
  open,
  department,
  onClose,
  onSaved,
}) {
  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* --- overlay ----------- */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* --- modal ----------- */}
      <div className="relative glass w-full max-w-2xl mx-4 p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold gradient-heading">
            {department ? "Edit Department" : "Add Department"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-[var(--card)]"
          >
            <FaTimes />
          </button>
        </div>

        <DepartmentForm
          key={department?.id || "new"}
          initialData={department}
          onSaved={() => {
            onSaved();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
