import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)]/70 backdrop-blur-sm">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl max-w-lg w-full">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--border)]">
          <h2 className="text-xl font-semibold text-[var(--text)]">{title}</h2>

          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--color-main)]"
          >
            ✕
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
