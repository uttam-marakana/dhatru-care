import { useState } from "react";

export default function NotesModal({ open, onClose, onSave }) {
  const [note, setNote] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add Note</h3>

        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              onSave(note);
              setNote("");
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
