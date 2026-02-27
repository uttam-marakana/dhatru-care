// src/pages/Departments.jsx
import { useState, useEffect } from "react";
import PageHero from "../sections/shared/PageHero";
import DepartmentsGrid from "../sections/departments/DepartmentsGrid";
import AppointmentCTA from "../sections/shared/AppointmentCTA";

export default function Departments() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API/data loading (replace with real fetch later)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // realistic delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Page Hero Banner */}
      <PageHero
        title="Our Specialities"
        subtitle="Comprehensive multispeciality care with expert teams, advanced technology, and compassionate approach"
        bgClass="bg-gradient-to-br from-primary/10 via-white to-secondary/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      />

      {/* Departments Grid with Loading Skeleton */}
      <section className="py-12 md:py-20 lg:py-24">
        <DepartmentsGrid isLoading={isLoading} />
      </section>

      {/* Final CTA */}
      <AppointmentCTA
        variant="large"
        className="my-12 md:my-16 lg:my-20 mx-4 md:mx-8 lg:mx-auto max-w-6xl rounded-3xl"
      />
    </div>
  );
}
