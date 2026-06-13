import { useState, useMemo } from 'react';
import StatusBadge from '../common/StatusBadge';
import LeadDrawer from '../common/LeadDrawer';

export default function ContactMessagesTable({ messages, onUpdate, loadingId }) {
  const [activeId, setActiveId] = useState(null);

  const activeLead = useMemo(() => messages.find((m) => m.id === activeId), [messages, activeId]);

  /* --- SLA HELPER --- */
  const isOverdue = (m) => {
    if (!m.createdAt || m.isLocked) return false;
    const created = m.createdAt.toDate?.() || new Date(m.createdAt);
    return Date.now() - created.getTime() > 1000 * 60 * 60 * 24; // 24h
  };

  const getPriorityStyle = (priority) => {
    if (priority === 'high') return 'text-red-500 font-medium';
    if (priority === 'low') return 'text-gray-400';
    return '';
  };

  return (
    <>
      <div className="glass overflow-x-auto">
        <table className="min-w-full table-fixed text-sm">
          {/* HEADER */}
          <thead className="border-b border-[var(--border)]">
            <tr className="text-left text-[var(--text-secondary)]">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Status</th>
              <th className="p-4">Priority</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {messages.map((m) => {
              const status = (m.status || 'new').toLowerCase();
              const overdue = isOverdue(m);
              const unread = !m.isRead;

              return (
                <tr
                  key={m.id}
                  onClick={() => setActiveId(m.id)}
                  className={`
                    border-b border-[var(--border)]
                    hover:bg-[var(--card)]
                    transition cursor-pointer
                    ${loadingId === m.id ? 'opacity-50 pointer-events-none' : ''}
                    ${unread ? 'bg-blue-50/40' : ''}
                  `}
                >
                  {/* NAME */}
                  <td className="p-4 font-medium flex items-center gap-2">
                    {m.name}

                    {/* UNREAD DOT */}
                    {unread && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                  </td>

                  {/* EMAIL */}
                  <td className="p-4 text-[var(--muted)]">{m.email}</td>

                  {/* SUBJECT */}
                  <td className="p-4 max-w-[220px] truncate">{m.subject || '-'}</td>

                  {/* STATUS */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={status} />

                      {/* ✔ FINAL */}
                      {m.isLocked && <span className="text-xs text-gray-400">✔</span>}

                      {/* NOTES COUNT */}
                      {m.notes?.length > 0 && (
                        <span className="text-xs text-gray-400">{m.notes.length}</span>
                      )}

                      {/* SLA BADGE */}
                      {overdue && <span className="text-xs text-red-500 font-medium">overdue</span>}
                    </div>
                  </td>

                  {/* PRIORITY */}
                  <td
                    className={`p-4 capitalize text-[var(--muted)] ${getPriorityStyle(m.priority)}`}
                  >
                    {m.priority}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* DRAWER */}
      <LeadDrawer
        open={!!activeId}
        lead={activeLead}
        onClose={() => setActiveId(null)}
        onUpdate={onUpdate}
      />
    </>
  );
}
