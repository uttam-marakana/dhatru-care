import { useState, useMemo } from "react";

const PAGE_SIZE = 10;

export default function AdminTable({ data = [], columns = [], renderRow }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search) return data;

    const q = search.toLowerCase();

    return data.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(q),
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="ui-input max-w-xs"
      />

      <div className="glass overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-[var(--border)]">
            <tr className="text-left text-[var(--text-secondary)]">
              {columns.map((c) => (
                <th key={c} className="p-4">
                  {c}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{paginated.map((row) => renderRow(row))}</tbody>
        </table>
      </div>

      {filtered.length > PAGE_SIZE && (
        <div className="flex justify-end gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg"
          >
            Previous
          </button>

          <span className="text-[var(--muted)]">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
