import { useState, useEffect, lazy } from "react";

// Dynamic imports for code splitting
const PageHero = lazy(() => import("../sections/shared/PageHero"));
const DoctorFilters = lazy(() => import("../sections/doctors/DoctorFilters"));
const DoctorsList = lazy(() => import("../sections/doctors/DoctorsList"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));

import { getDoctors } from "../api/doctorsApi"; // ← your Firebase API

export default function Doctors() {
  const [filters, setFilters] = useState({
    search: "",
    specialty: "",
    experience: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getDoctors(filters); // pass filters if your API supports it
        setDoctors(data);
      } catch (err) {
        setError("Failed to load doctors. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [filters]); // re-fetch when filters change

  return (
    <>
      <PageHero
        title="Our Expert Doctors"
        subtitle="Highly qualified specialists committed to providing personalized and compassionate care"
        bgClass="bg-gradient-to-br from-primary/10 via-white to-secondary/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      />

      <DoctorFilters onFilterChange={setFilters} />

      <DoctorsList
        doctors={doctors}
        loading={loading}
        error={error}
        filters={filters}
      />

      <AppointmentCTA variant="large" className="my-12 md:my-16 lg:my-20" />
    </>
  );
}
