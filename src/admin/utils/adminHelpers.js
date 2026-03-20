/* --- FORMAT DATE ----------- */

export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  return d.toLocaleDateString();
};

/* --- FORMAT DATE TIME ----------- */

export const formatDateTime = (date) => {
  if (!date) return "";

  const d = new Date(date);

  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};

/* --- PAGINATE DATA ----------- */

export const paginate = (data, page, pageSize) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return data.slice(start, end);
};

/* --- TOTAL PAGES ----------- */

export const getTotalPages = (dataLength, pageSize) => {
  return Math.ceil(dataLength / pageSize);
};

/* --- SEARCH FILTER ----------- */

export const searchFilter = (items, term, fields = []) => {
  if (!term) return items;

  const lower = term.toLowerCase();

  return items.filter((item) =>
    fields.some((field) =>
      item[field]?.toString().toLowerCase().includes(lower),
    ),
  );
};

/* --- SORT BY DATE ----------- */

export const sortByDateDesc = (items, field = "createdAt") => {
  return [...items].sort((a, b) => {
    const aDate = new Date(a[field]);
    const bDate = new Date(b[field]);

    return bDate - aDate;
  });
};

/* --- ARRAY TO CSV ----------- */

export const arrayToCSV = (arr) => {
  if (!Array.isArray(arr)) return "";

  return arr.join(", ");
};

/* --- CSV TO ARRAY ----------- */

export const csvToArray = (value) => {
  if (!value) return [];

  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

/* --- SAFE NUMBER ----------- */

export const toNumber = (value, fallback = 0) => {
  const n = Number(value);

  return Number.isNaN(n) ? fallback : n;
};
