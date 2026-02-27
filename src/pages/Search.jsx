import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState({
    doctors: [],
    departments: [],
    packages: [],
    blogs: [],
  });
  const [loading, setLoading] = useState(true);

  // Simulate search (replace with real API call later)
  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Demo results – replace with axios/fetch to your backend
    setTimeout(() => {
      setResults({
        doctors: [
          { id: 1, name: "Dr. Rajesh Patel", specialty: "Cardiology" },
          { id: 2, name: "Dr. Priya Sharma", specialty: "Neurology" },
        ],
        departments: [
          { slug: "cardiology", name: "Cardiology" },
          { slug: "neurology", name: "Neurology" },
        ],
        packages: [{ id: 1, name: "Heart Health Package" }],
        blogs: [{ id: 1, title: "How to Prevent Heart Disease" }],
      });
      setLoading(false);
    }, 800);
  }, [query]);

  return (
    <Container className="py-12 md:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Search Results for "{query}"
        </h1>

        <form className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              defaultValue={query}
              placeholder="Search doctors, departments, packages, blogs..."
              className="
                w-full pl-12 pr-5 py-4 rounded-full border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-primary text-lg
              "
            />
            <button
              type="submit"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              aria-label="Search"
            >
              <FaSearch size={20} />
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Searching...
            </p>
          </div>
        ) : query.trim() === "" ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            Please enter a search term above.
          </p>
        ) : (
          <div className="space-y-12">
            {/* Doctors */}
            {results.doctors.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">Doctors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.doctors.map((doc) => (
                    <Link
                      key={doc.id}
                      to={`/doctors/${doc.id}`}
                      className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-md transition"
                    >
                      <h3 className="font-bold text-lg">{doc.name}</h3>
                      <p className="text-primary">{doc.specialty}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Departments */}
            {results.departments.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">Departments</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.departments.map((dept) => (
                    <Link
                      key={dept.slug}
                      to={`/departments/${dept.slug}`}
                      className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-md transition"
                    >
                      <h3 className="font-bold text-lg">{dept.name}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Packages & Blogs – similar structure */}
            {/* Add more sections as needed */}
          </div>
        )}
      </div>
    </Container>
  );
}
