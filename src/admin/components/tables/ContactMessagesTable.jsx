import { useState } from "react";
import StatusBadge from "../common/StatusBadge";
import LeadDrawer from "../common/LeadDrawer";
import ContactAnalytics from "../common/ContactAnalytics";

export default function ContactMessagesTable({
  messages,
  onUpdate,
  loadingId,
}) {
  const [activeLead, setActiveLead] = useState(null);

  return (
    <>
      <ContactAnalytics />
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
                className="border-b hover:bg-[var(--card)] cursor-pointer"
                onClick={() => setActiveLead(m)}
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

      {/* Drawer */}
      <LeadDrawer
        open={!!activeLead}
        lead={activeLead}
        onClose={() => setActiveLead(null)}
        onUpdate={onUpdate}
      />
    </>
  );
}
