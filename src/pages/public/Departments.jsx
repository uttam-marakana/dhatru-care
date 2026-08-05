import { useState, useEffect, lazy, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAllDepartments } from "../../api/departmentsApi";

import UniversalFilterLayout from "../../components/filters/UniversalFilterLayout";

const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const DepartmentsGrid = lazy(
  () => import("../../sections/departments/DepartmentsGrid"),
);
const DepartmentFilters = lazy(
  () => import("../../sections/departments/DepartmentFilters"),
);
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

export default function Departments() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getAllDepartments();

        if (!mounted) return;

        setDepartments(data);
      } catch (err) {
        console.error(err);

        if (mounted) setError("Failed to load departments");
      } finally {
        if (mounted) setLoading(false);
      }
    };

fetchData();

    return () => {
      mounted = false;
    };
  }, [location.key]);

  /* --- Sync filters → URL ----------- */

  useEffect(() => {
    const params = {};

    Object.entries(filters).forEach(([k, v]) => {
      if (v) params[k] = v;
    });

    setSearchParams(params);
  }, [filters, setSearchParams]);

  /* --- Filter departments ----------- */

  const filteredDepartments = useMemo(() => {
    let data = [...departments];

    if (filters.search) {
      const term = filters.search.toLowerCase();

      data = data.filter(
        (d) =>
          d.name?.toLowerCase().includes(term) ||
          d.description?.toLowerCase().includes(term) ||
          d.slug?.toLowerCase().includes(term),
      );
    }

    if (filters.category) {
      data = data.filter((d) => d.slug === filters.category);
    }

    return data;
  }, [filters, departments]);

  const clearFilters = () => {
    setFilters({ search: "", category: "" });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-b
        from-gray-50 via-gray-100 to-gray-50
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
      "
    >
<PageHero
        title="Our Specialities"
        subtitle="Comprehensive multispeciality care with expert teams."
      />

      <UniversalFilterLayout
        filters={filters}
        onChange={setFilters}
        FiltersComponent={DepartmentFilters}
      />

      {hasActiveFilters && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <button
            onClick={clearFilters}
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      )}

      <section className="py-20 relative">
        <div
          className="
            absolute top-1/3 left-1/2 -translate-x-1/2
            w-[700px] h-[700px]
            bg-[var(--glow-bg)]
            blur-[160px]
            rounded-full
            pointer-events-none
          "
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {loading ? (
            <p className="text-center py-20 text-gray-500">
              Loading departments...
            </p>
          ) : error ? (
            <p className="text-center text-red-500 py-20">{error}</p>
) : (
            <DepartmentsGrid departments={filteredDepartments} />
          )}
        </div>
      </section>

      <AppointmentCTA className="my-16 mx-auto max-w-7xl" />
    </main>
  );
}
