import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorsApi";
import { useDebounce } from "../hooks/useDebounce";

export default function useSearchSuggestions(query) {
  const [results, setResults] = useState({ doctors: [] });
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setResults({ doctors: [] });
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);

      try {
        const doctors = await getDoctors();

        const q = debouncedQuery.toLowerCase();

        const filteredDoctors = doctors
          .filter(
            (doc) =>
              doc.name?.toLowerCase().includes(q) ||
              doc.specialty?.toLowerCase().includes(q) ||
              doc.departmentName?.toLowerCase().includes(q),
          )
          .slice(0, 5);

        setResults({ doctors: filteredDoctors });
      } catch (error) {
        console.error("Search suggestion error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return { results, loading };
}
