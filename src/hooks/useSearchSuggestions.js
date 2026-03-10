import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorsApi";

export function useSearchSuggestions(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    async function search() {
      const doctors = await getDoctors();

      const filtered = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(query.toLowerCase()),
      );

      setSuggestions(filtered.slice(0, 5));
    }

    search();
  }, [query]);

  return suggestions;
}
