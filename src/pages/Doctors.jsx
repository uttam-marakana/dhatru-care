import { useState, useEffect } from "react";
import PageHero from "../sections/shared/PageHero";
import DoctorFilters from "../sections/doctors/DoctorFilters";
import DoctorsList from "../sections/doctors/DoctorsList";
import AppointmentCTA from "../sections/shared/AppointmentCTA";

export default function Doctors() {
  const [filters, setFilters] = useState({
    search: "",
    specialty: "",
    experience: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data load (replace with real fetch later)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // realistic fake delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageHero
        title="Our Expert Doctors"
        subtitle="Highly qualified specialists committed to providing personalized and compassionate care"
        bgClass="bg-gradient-to-br from-primary/10 via-white to-secondary/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      />

      <DoctorFilters onFilterChange={setFilters} />

      <DoctorsList filters={filters} isLoading={isLoading} />

      <AppointmentCTA variant="large" className="my-12 md:my-16 lg:my-20" />
    </>
  );
}
