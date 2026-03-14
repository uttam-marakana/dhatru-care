import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import PackageForm from "../forms/PackageForm";

export default function PackageFormModal({ open, pkg, onClose, onSaved }) {
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
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative glass w-full max-w-3xl mx-4 p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold gradient-heading">
            {pkg ? "Edit Package" : "Add Package"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-[var(--card)]"
          >
            <FaTimes />
          </button>
        </div>

        <PackageForm
          key={pkg?.id || "new"}
          initialData={pkg}
          onSaved={() => {
            onSaved();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
