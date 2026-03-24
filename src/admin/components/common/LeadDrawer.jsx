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
      isLocked: true,
    });

    setNote("");
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full sm:w-[420px] bg-[var(--card)] border-l border-[var(--border)] p-6 overflow-y-auto shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Lead Details</h2>
          <button
            onClick={onClose}
            className="text-sm text-[var(--muted)] hover:text-[var(--text)]"
          >
            ✕
          </button>
        </div>

        {/* INFO */}
        <div className="space-y-3 text-sm">
          <Info label="Name" value={lead.name} />
          <Info label="Email" value={lead.email} />
          <Info label="Subject" value={lead.subject} />
          <Info label="Message" value={lead.message} />
        </div>

        {/* STATUS */}
        <div className="mt-6">
          <label className="text-sm text-[var(--muted)]">Status</label>
          <select
            disabled={isLocked}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="ui-select mt-1 disabled:opacity-60"
          >
            <option>new</option>
            <option>read</option>
            <option>replied</option>
          </select>
        </div>

        {/* PRIORITY */}
        <div className="mt-4">
          <label className="text-sm text-[var(--muted)]">Priority</label>
          <select
            disabled={isLocked}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="ui-select mt-1 disabled:opacity-60"
          >
            <option>low</option>
            <option>normal</option>
            <option>high</option>
          </select>
        </div>

        {/* NOTES */}
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Notes</h3>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {lead.notes?.length > 0 ? (
              lead.notes.map((n, i) => (
                <div
                  key={i}
                  className="text-xs bg-[var(--glass)] p-2 rounded border"
                >
                  {n.text}
                </div>
              ))
            ) : (
              <p className="text-xs text-[var(--muted)]">No notes yet</p>
            )}
          </div>

          {!isLocked && (
            <textarea
              className="ui-textarea mt-3"
              rows={3}
              placeholder="Add note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          )}
        </div>

        {/* ACTION */}
        {!isLocked && (
          <button onClick={handleSave} className="ui-button mt-6">
            Save & Finalize
          </button>
        )}

        {isLocked && (
          <p className="mt-4 text-sm text-[var(--color-success)] text-center">
            This record is finalized and cannot be edited.
          </p>
        )}
      </div>
    </div>
  );
}

/* --- HELPER --- */
function Info({ label, value }) {
  return (
    <p>
      <span className="text-[var(--muted)]">{label}:</span>{" "}
      <span className="font-medium">{value || "-"}</span>
    </p>
  );
}
