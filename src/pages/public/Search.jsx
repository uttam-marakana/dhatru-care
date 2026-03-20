import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../../components/layout/Container";

import { getDoctors } from "../../api/doctorsApi";
import { getAllDepartments } from "../../api/departmentsApi";
import { getPackages } from "../../api/packagesApi";
import { getBlogPosts } from "../../api/blogsApi";

import { rankResults } from "../../utils/searchRanking";

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

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);

      try {
        const [doctors, departments, packages, blogs] = await Promise.all([
          getDoctors(),
          getAllDepartments(),
          getPackages(),
          getBlogPosts(),
        ]);

        setResults({
          doctors: rankResults(doctors, query, [
            "name",
            "specialty",
            "departmentName",
          ]),
          departments: rankResults(departments, query, ["name"]),
          packages: rankResults(packages, query, ["name"]),
          blogs: rankResults(blogs, query, ["title"]),
        });
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Container className="py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-center">
            Search Results for "{query}"
          </h1>

          {loading && (
            <p className="text-center text-[var(--text-secondary)]">
              Searching...
            </p>
          )}

          {/* --- Doctors ----------- */}

          {results.doctors.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Doctors</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {results.doctors.map((doc) => (
                  <Link
                    key={doc.id}
                    to={`/doctors/${doc.id}`}
                    className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                  >
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-[var(--color-primary)]">
                      {doc.specialty}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* --- Departments ----------- */}

          {results.departments.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Departments</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {results.departments.map((dep) => (
                  <Link
                    key={dep.id}
                    to={`/departments/${dep.id}`}
                    className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                  >
                    {dep.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* --- Packages ----------- */}

          {results.packages.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Packages</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {results.packages.map((pkg) => (
                  <Link
                    key={pkg.id}
                    to="/packages"
                    className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                  >
                    {pkg.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* --- Blogs ----------- */}

          {results.blogs.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">Blogs</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {results.blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                  >
                    {blog.title}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </main>
  );
}
