export default function StatusBadge({ status }) {
  const map = {
    new: "bg-blue-100 text-blue-600",
    read: "bg-yellow-100 text-yellow-600",
    replied: "bg-green-100 text-green-600",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${map[status] || ""}`}>
      {status}
    </span>
  );
}
