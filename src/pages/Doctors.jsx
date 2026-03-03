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

  /* ------------ FILTER STATE ---------------------------------------------- */
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    specialty: searchParams.get("specialty") || "",
    experience: searchParams.get("experience") || "",
  });

  const [allDoctors, setAllDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ------------ FETCH DOCTORS ---------------------------------------------- */
  useEffect(() => {
    let mounted = true;

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

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

    return () => {
      mounted = false;
    };
  }, []);

  /* ------------ URL SYNC ---------------------------------------------- */
  useEffect(() => {
    const params = {};

    if (filters.search) params.search = filters.search;
    if (filters.specialty) params.specialty = filters.specialty;
    if (filters.experience) params.experience = filters.experience;

    setSearchParams(params);
  }, [filters, setSearchParams]);

  /* ------------ LOCAL FILTERING ---------------------------------------------- */
  useEffect(() => {
    let data = [...allDoctors];

    if (filters.search) {
      const term = filters.search.toLowerCase();
      data = data.filter((d) => d.name?.toLowerCase().includes(term));
    }

    if (filters.specialty) {
      data = data.filter(
        (d) => d.specialty?.toLowerCase() === filters.specialty.toLowerCase(),
      );
    }

    if (filters.experience) {
      data = data.filter((d) =>
        d.experience?.toLowerCase().includes(filters.experience.toLowerCase()),
      );
    }

    setDoctors(data);
  }, [filters, allDoctors]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <PageHero
        title="Our Expert Doctors"
        subtitle="Highly qualified specialists committed to personalized care"
        bgClass="bg-gradient-to-br from-primary/10 via-white to-secondary/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      />

      {/* UNIVERSAL FILTER SYSTEM */}
      <UniversalFilterLayout
        filters={filters}
        onChange={setFilters}
        FiltersComponent={DoctorFilters}
      />

      {/* DOCTORS LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <DoctorsList
          doctors={doctors}
          loading={loading}
          error={error}
          filters={filters}
        />
      </section>

      <AppointmentCTA variant="large" className="my-12 md:my-16 lg:my-20" />
    </main>
  );
}
