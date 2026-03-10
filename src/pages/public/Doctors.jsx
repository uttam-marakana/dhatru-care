import { useState, useEffect, lazy, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getDoctors } from "../../api/doctorsApi";
import UniversalFilterLayout from "../../components/filters/UniversalFilterLayout";

const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const DoctorFilters = lazy(
  () => import("../../sections/doctors/DoctorFilters"),
);
const DoctorsList = lazy(() => import("../../sections/doctors/DoctorsList"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

export default function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    departmentId: searchParams.get("departmentId") || "",
    experience: searchParams.get("experience") || "",
  });

  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDoctors()
      .then(setAllDoctors)
      .catch(() => setError("Failed to load doctors."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const params = {};
    Object.entries(filters).forEach(([k, v]) => v && (params[k] = v));
    setSearchParams(params);
  }, [filters]);

  const doctors = useMemo(() => {
    let data = [...allDoctors];

    if (filters.search) {
      const term = filters.search.toLowerCase();

      data = data.filter(
        (d) =>
          d.name?.toLowerCase().includes(term) ||
          d.specialty?.toLowerCase().includes(term),
      );
    }

    if (filters.departmentId) {
      data = data.filter((d) => d.departmentId === filters.departmentId);
    }

    if (filters.experience) {
      data = data.filter((d) => {
        const exp = parseFloat(d.experience);
        return exp >= Number(filters.experience);
      });
    }

    return data;
  }, [filters, allDoctors]);

  const clearFilters = () => {
    setFilters({
      search: "",
      departmentId: "",
      experience: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <PageHero
        title="Our Expert Doctors"
        subtitle="Highly qualified specialists committed to personalized care"
      />

      <UniversalFilterLayout
        filters={filters}
        onChange={setFilters}
        FiltersComponent={DoctorFilters}
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

      <section className="max-w-7xl mx-auto px-4 py-10">
        <DoctorsList doctors={doctors} loading={loading} error={error} />
      </section>

      <AppointmentCTA variant="large" className="my-16" />
    </main>
  );
}
