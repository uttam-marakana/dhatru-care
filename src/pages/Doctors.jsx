import { useState, useEffect, lazy, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getDoctors } from "../api/doctorsApi";
import UniversalFilterLayout from "../components/filters/UniversalFilterLayout";

const PageHero = lazy(() => import("../sections/shared/PageHero"));
const DoctorFilters = lazy(() => import("../sections/doctors/DoctorFilters"));
const DoctorsList = lazy(() => import("../sections/doctors/DoctorsList"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));

export default function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    specialty: searchParams.get("specialty") || "",
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

    if (filters.specialty) {
      data = data.filter(
        (d) => d.specialty?.toLowerCase() === filters.specialty.toLowerCase(),
      );
    }

    if (filters.experience) {
      data = data.filter((d) => d.experience?.includes(filters.experience));
    }

    return data;
  }, [filters, allDoctors]);

  const clearFilters = () => {
    setFilters({
      search: "",
      specialty: "",
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

      {/* ACTIVE FILTERS */}
      {hasActiveFilters && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={clearFilters}
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              Clear All
            </button>

            {Object.entries(filters).map(([key, value]) =>
              value ? (
                <div
                  key={key}
                  className="
                  flex items-center gap-2
                  bg-[var(--card)]
                  border border-[var(--border)]
                  text-sm text-[var(--text)]
                  px-3 py-1.5 rounded-full
                  "
                >
                  <span className="capitalize">
                    {key}: {value}
                  </span>

                  <button
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        [key]: "",
                      }))
                    }
                    className="text-(--muted) hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ) : null,
            )}
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-4 py-10">
        <DoctorsList
          doctors={doctors}
          loading={loading}
          error={error}
          filters={filters}
        />
      </section>

      <AppointmentCTA variant="large" className="my-16" />
    </main>
  );
}
