import { useEffect } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";

export default function ConfirmDeleteModal({
  open,
  title = "Delete Item",
  description = "Are you sure you want to delete this item?",
  onConfirm,
  onClose,
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
        max-w-md
        mx-4
        p-6
        animate-fade-in-up
        "
      >
        {/* HEADER */}

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>

          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-[var(--card)]"
          >
            <FaTimes />
          </button>
        </div>

        {/* DESCRIPTION */}

        <p className="text-sm text-[var(--text-secondary)] mb-6">
          {description}
        </p>

        {/* ACTIONS */}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
            px-4 py-2 rounded-lg
            border border-[var(--border)]
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
            flex items-center gap-2
            px-4 py-2 rounded-lg
            bg-[var(--color-error)]
            text-white
            hover:opacity-90
            "
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
