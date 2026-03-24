import { useState, useEffect } from "react";

export default function LeadDrawer({ open, onClose, lead, onUpdate }) {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("new");
  const [priority, setPriority] = useState("normal");

  useEffect(() => {
    if (lead) {
      setStatus(lead.status || "new");
      setPriority(lead.priority || "normal");
    }
  }, [lead]);

  if (!open || !lead) return null;

  const isLocked = lead?.isLocked;

  const handleSave = () => {
    if (isLocked) return;

    onUpdate(lead.id, {
      status,
      priority,
      notes: note
        ? [
            ...(lead.notes || []),
            { text: note, createdAt: new Date().toISOString() },
          ]
        : lead.notes || [],
      isLocked: true, // enforce single update
    });

    setNote("");
  };

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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
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

          {!isLocked && (
            <textarea
              className="w-full border rounded p-2 mt-3"
              rows={3}
              placeholder="Add note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          )}
        </div>

        {/* SINGLE ACTION BUTTON */}
        {!isLocked && (
          <button
            onClick={handleSave}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded"
          >
            Save & Finalize
          </button>
        )}

        {isLocked && (
          <p className="mt-4 text-sm text-green-600 text-center">
            This record is finalized and cannot be edited.
          </p>
        )}
      </div>
    </div>
  );
}
