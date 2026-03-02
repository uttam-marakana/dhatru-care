import { useState, useEffect, lazy, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getDoctors } from "../api/doctorsApi";
import { FaFilter, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* ACTIVE FILTER COUNT */
  const activeFiltersCount = useMemo(
    () => Object.values(filters).filter(Boolean).length,
    [filters],
  );

  /* FETCH DOCTORS */
  useEffect(() => {
    let mounted = true;

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();

        if (!mounted) return;

        setAllDoctors(data);
        setDoctors(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load doctors.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDoctors();
    return () => (mounted = false);
  }, []);

  /* URL SYNC */
  useEffect(() => {
    const params = {};

    if (filters.search) params.search = filters.search;
    if (filters.specialty) params.specialty = filters.specialty;
    if (filters.experience) params.experience = filters.experience;

    setSearchParams(params);
  }, [filters, setSearchParams]);

  /* FILTERING */
  useEffect(() => {
    let data = [...allDoctors];

    if (filters.search) {
      data = data.filter((d) =>
        d.name?.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.specialty) {
      data = data.filter((d) => d.specialty === filters.specialty);
    }

    if (filters.experience) {
      data = data.filter((d) =>
        d.experience?.toLowerCase().includes(filters.experience.toLowerCase()),
      );
    }

    setDoctors(data);
  }, [filters, allDoctors]);

  /* STABLE CALLBACK (VERY IMPORTANT) */
  const handleFilterChange = useCallback((value) => {
    setFilters(value);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <PageHero
        title="Our Expert Doctors"
        subtitle="Highly qualified specialists committed to personalized care"
        bgClass="bg-gradient-to-br from-primary/10 via-white to-secondary/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      />

      {/* DESKTOP FILTERS */}
      <section className="hidden lg:block sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <DoctorFilters onFilterChange={handleFilterChange} />
        </div>
      </section>

      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="relative bg-primary text-white p-4 rounded-full shadow-lg"
        >
          <FaFilter size={18} />

          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* FILTER DRAWER */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute right-0 top-0 h-full w-[85%] sm:w-100 bg-white dark:bg-gray-900 shadow-xl p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Filters</h3>

                <button onClick={() => setIsFilterOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <DoctorFilters onFilterChange={handleFilterChange} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIST */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <DoctorsList doctors={doctors} loading={loading} error={error} />
      </section>

      <AppointmentCTA variant="large" className="my-12 md:my-16 lg:my-20" />
    </main>
  );
}
