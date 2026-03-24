export default function ContactAnalytics({ data }) {
  const total = data.length;

  const stats = data.reduce(
    (acc, m) => {
      acc[m.status] = (acc[m.status] || 0) + 1;
      return acc;
    },
    { new: 0, read: 0, replied: 0 },
  );

  const highPriority = data.filter((m) => m.priority === "high").length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card title="Total Leads" value={total} />
      <Card title="New" value={stats.new} />
      <Card title="Replied" value={stats.replied} />
      <Card title="High Priority" value={highPriority} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-4 rounded-xl bg-[var(--card)] border">
      <p className="text-sm text-[var(--muted)]">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
