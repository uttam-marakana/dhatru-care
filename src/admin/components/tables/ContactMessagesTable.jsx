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
                <td>
                  <StatusBadge status={m.status} />
                </td>
                <td>{m.priority}</td>
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
