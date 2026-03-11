export function rankResults(items, query, fields = []) {
  const q = query.toLowerCase();

  return items
    .map((item) => {
      let score = 0;

      fields.forEach((field) => {
        const value = item[field]?.toLowerCase();

        if (!value) return;

        if (value === q)
          score += 100; // exact match
        else if (value.startsWith(q)) score += 60;
        else if (value.includes(q)) score += 30;
      });

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}
