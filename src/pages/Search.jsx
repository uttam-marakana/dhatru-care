import { useSearchParams, Link } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getDoctors } from "../api/doctorsApi";

const Container = lazy(() => import("../components/layout/Container"));

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [results, setResults] = useState({
    doctors: [],
    departments: [],
    packages: [],
    blogs: [],
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
        const doctorsData = await getDoctors();

        const filteredDoctors = doctorsData.filter(
          (doc) =>
            doc.name?.toLowerCase().includes(query) ||
            doc.specialty?.toLowerCase().includes(query),
        );

        setResults({ doctors: filteredDoctors });
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
    <main className="min-h-screen bg-(--bg)">
      {" "}
      <Container className="py-12 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-(--text)">
            Search Results for "{query}"
          </h1>

          {/* SEARCH BAR */}
          <form className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                defaultValue={query}
                placeholder="Search doctors, departments, packages, blogs..."
                className="
            w-full pl-12 pr-5 py-4 rounded-full
            border border-(--border)
            bg-(--card)
            text-(--text)
            placeholder-(--muted)
            focus:outline-none
            focus:border-primary
            focus:shadow-[0_0_20px_var(--glow-soft)
            text-lg
            "
              />

              <button
                type="submit"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--muted)"
                aria-label="Search"
              >
                <FaSearch size={20} />
              </button>
            </div>
          </form>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-[var(--text-secondary)]">Searching...</p>
            </div>
          ) : query.trim() === "" ? (
            <p className="text-center text-[var(--text-secondary)] text-lg">
              Please enter a search term above.
            </p>
          ) : error ? (
            <p className="text-center text-red-500 text-lg">{error}</p>
          ) : (
            <div className="space-y-12">
              {/* DOCTORS RESULTS */}
              {results.doctors.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6 text-(--text)">
                    Doctors
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.doctors.map((doc) => (
                      <Link
                        key={doc.id}
                        to={`/doctors/${doc.id}`}
                        className="
                    p-6 rounded-xl
                    bg-(--card)
                    border border-(--border)
                    hover:border-[var(--color-primary)]/40
                    hover:shadow-[0_0_25px_var(--glow-soft)
                    transition
                    "
                      >
                        <h3 className="font-bold text-lg text-(--text)">
                          {doc.name}
                        </h3>

                        <p className="text-[var(--color-primary)]">
                          {doc.specialty}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {results.doctors.length === 0 && (
                <p className="text-center text-[var(--text-secondary)] text-lg">
                  No results found for "{query}".
                </p>
              )}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
