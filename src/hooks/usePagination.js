import { useState, useMemo } from "react";

export default function usePagination(data = [], pageSize = 10) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const next = () => setPage((p) => Math.min(p + 1, totalPages));
  const prev = () => setPage((p) => Math.max(p - 1, 1));

  const reset = () => setPage(1);

  return {
    page,
    totalPages,
    paginatedData,
    next,
    prev,
    setPage,
    reset,
  };
}
