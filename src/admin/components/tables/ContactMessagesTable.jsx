import { useState, useMemo } from "react";
import StatusBadge from "../common/StatusBadge";
import LeadDrawer from "../common/LeadDrawer";

export default function ContactMessagesTable({
  messages,
  onUpdate,
  loadingId,
}) {
  const [activeId, setActiveId] = useState(null);

  const activeLead = useMemo(
    () => messages.find((m) => m.id === activeId),
    [messages, activeId],
  );

  return (
    <>
      <div className="glass overflow-x-auto">
        <table className="min-w-[600px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((m) => (
              <tr
                key={m.id}
                onClick={() => setActiveId(m.id)}
                className={`border-b hover:bg-[var(--card)] cursor-pointer ${
                  loadingId === m.id ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <td className="p-3">{m.name}</td>
                <td>{m.email}</td>

                {/* STATUS */}
                <td onClick={(e) => e.stopPropagation()}>
                  <StatusBadge status={m.status} />

                  {!m.isLocked && (
                    <select
                      value={m.status}
                      onChange={(e) =>
                        onUpdate(m.id, { status: e.target.value })
                      }
                      className="ml-2 px-2 py-1 border rounded"
                    >
                      <option>new</option>
                      <option>read</option>
                      <option>replied</option>
                    </select>
                  )}

                  {m.isLocked && (
                    <span className="ml-2 text-xs text-green-600">✔ Final</span>
                  )}
                </td>

                {/* PRIORITY */}
                <td onClick={(e) => e.stopPropagation()}>
                  {!m.isLocked ? (
                    <select
                      value={m.priority}
                      onChange={(e) =>
                        onUpdate(m.id, { priority: e.target.value })
                      }
                      className="px-2 py-1 border rounded"
                    >
                      <option>low</option>
                      <option>normal</option>
                      <option>high</option>
                    </select>
                  ) : (
                    <span className="text-sm text-gray-500">{m.priority}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LeadDrawer
        open={!!activeId}
        lead={activeLead}
        onClose={() => setActiveId(null)}
        onUpdate={onUpdate}
      />
    </>
  );
}
