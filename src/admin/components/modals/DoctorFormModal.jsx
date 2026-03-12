import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import DoctorForm from "../forms/DoctorForm";

export default function DoctorFormModal({ open, onClose, doctor }) {
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
      {/* OVERLAY */}

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}

      <div
        className="
        relative
        glass
        w-full
        max-w-4xl
        mx-4
        p-6
        max-h-[90vh]
        overflow-y-auto
        animate-fade-in-up
        "
      >
        {/* HEADER */}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold gradient-heading">
            {doctor ? "Edit Doctor" : "Add Doctor"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-[var(--card)]"
          >
            <FaTimes />
          </button>
        </div>

        {/* FORM */}

        <DoctorForm initialData={doctor} />
      </div>
    </div>
  );
}
