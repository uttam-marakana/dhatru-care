import { useState } from "react";

export default function LeadDrawer({ open, onClose, lead, onUpdate }) {
  const [note, setNote] = useState("");

  if (!open || !lead) return null;

  const isLocked = lead?.isLocked;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full sm:w-[420px] bg-white p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Lead Details</h2>

        <div className="space-y-3 text-sm">
          <p>
            <b>Name:</b> {lead.name}
          </p>
          <p>
            <b>Email:</b> {lead.email}
          </p>
          <p>
            <b>Subject:</b> {lead.subject}
          </p>
          <p>
            <b>Message:</b> {lead.message}
          </p>
        </div>

        {/* STATUS */}
        <div className="mt-6">
          <label>Status</label>
          <select
            disabled={isLocked}
            value={lead?.status || "new"}
            onChange={(e) => onUpdate(lead.id, { status: e.target.value })}
            className="w-full border p-2 rounded disabled:opacity-60"
          >
            <option>new</option>
            <option>read</option>
            <option>replied</option>
          </select>
        </div>

        {/* PRIORITY */}
        <div className="mt-4">
          <label>Priority</label>
          <select
            disabled={isLocked}
            value={lead?.priority || "normal"}
            onChange={(e) => onUpdate(lead.id, { priority: e.target.value })}
            className="w-full border p-2 rounded disabled:opacity-60"
          >
            <option>low</option>
            <option>normal</option>
            <option>high</option>
          </select>
        </div>

        {/* NOTES */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Notes</h3>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {lead.notes?.map((n, i) => (
              <div key={i} className="text-xs bg-gray-100 p-2 rounded">
                {n.text}
              </div>
            ))}
          </div>

          {/* LOCK NOTES INPUT */}
          {!isLocked && (
            <>
              <textarea
                className="w-full border rounded p-2 mt-3"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (!note) return;

                  onUpdate(lead.id, {
                    notes: [
                      ...(lead.notes || []),
                      { text: note, createdAt: new Date().toISOString() },
                    ],
                  });

                  setNote("");
                }}
              >
                Add Note
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
