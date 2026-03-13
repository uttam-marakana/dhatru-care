export default function Pagination({ page, totalPages, next, prev }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-4 mt-10">
      <button
        onClick={prev}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg border border-[var(--border)] disabled:opacity-40"
      >
        Previous
      </button>

      <span className="flex items-center text-[var(--muted)]">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={next}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg border border-[var(--border)] disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
