import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getDoctors } from "../../api/doctorsApi";
import Container from "../../components/layout/Container";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [results, setResults] = useState({
    doctors: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const doctors = await getDoctors();

        const filteredDoctors = doctors.filter(
          (doc) =>
            doc.name?.toLowerCase().includes(query) ||
            doc.specialty?.toLowerCase().includes(query) ||
            doc.departmentName?.toLowerCase().includes(query),
        );

        setResults({
          doctors: filteredDoctors,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to search. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Container className="py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-center">
            Search Results for "{query}"
          </h1>

          {loading ? (
            <p className="text-center">Searching...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : results.doctors.length === 0 ? (
            <p className="text-center text-gray-500">No results found</p>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Doctors</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.doctors.map((doc) => (
                  <Link
                    key={doc.id}
                    to={`/doctors/${doc.id}`}
                    className="
                    p-6
                    rounded-xl
                    bg-[var(--card)]
                    border border-[var(--border)]
                    hover:border-[var(--color-primary)]/40
                    transition
                    "
                  >
                    <h3 className="font-bold text-lg">{doc.name}</h3>

                    <p className="text-[var(--color-primary)]">
                      {doc.specialty}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
