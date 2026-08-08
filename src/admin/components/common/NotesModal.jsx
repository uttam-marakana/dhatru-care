import { useState } from 'react';

export default function NotesModal({ open, onClose, onSave }) {
  const [note, setNote] = useState('');

  if (!open) return null;

  return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">
          Add Note
        </h3>

        <textarea
          className="w-full border border-[var(--border)] rounded p-2 mb-4 bg-[var(--surface)] text-[var(--text)]"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)]"
          >
            Cancel
          </button>
          <button
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded"
            onClick={() => {
              onSave(note);
              setNote('');
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
