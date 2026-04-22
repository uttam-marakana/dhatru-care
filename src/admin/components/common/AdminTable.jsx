import { useState, useMemo } from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import CustomSelect from '../../../components/common/CustomSelect';

const PAGE_SIZE = 10;

export default function AdminTable({ data = [], columns = [], renderRow, filters = [] }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search) return data;

    const q = search.toLowerCase();

    return data.filter((row) => Object.values(row).join(' ').toLowerCase().includes(q));
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 items-end">
        <Input
          placeholder="Search records..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {filters.map(({ key, options, value: filterValue, onChange }) => (
          <CustomSelect
            key={key}
            options={options}
            value={filterValue}
            placeholder={`Filter ${key}`}
            onChange={onChange}
          />
        ))}
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[var(--card)] border-b border-[var(--border)]">
              <tr className="text-left text-[var(--text-secondary)]">
                {columns.map((c) => (
                  <th key={c} className="p-6 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {paginated.map((row, i) => (
                <tr
                  key={row.id || i}
                  className="hover:bg-[var(--card)] transition-colors duration-200"
                >
                  {renderRow(row)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-[var(--muted)]">
            Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of{' '}
            {filtered.length} results
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="px-3 py-1 text-sm bg-[var(--card)] rounded-md font-medium">
              Page {page} of {totalPages}
            </span>

            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
