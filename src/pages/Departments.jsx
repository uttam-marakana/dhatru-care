import { useState, useEffect } from "react";
import PageHero from "../sections/shared/PageHero";
import DepartmentsGrid from "../sections/departments/DepartmentsGrid";
import AppointmentCTA from "../sections/shared/AppointmentCTA";
import { getAllDepartments } from "../api/departmentsApi"; // ← your Firebase API

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllDepartments();
        setDepartments(data);
      } catch (err) {
        setError("Failed to load departments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <PageHero
        title="Our Specialities"
        subtitle="Comprehensive multispeciality care with expert teams, advanced technology, and compassionate approach"
        bgClass="bg-gradient-to-br from-primary/10 via-white to-secondary/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      />

      <section className="py-12 md:py-20 lg:py-24">
        {loading ? (
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm h-96"
                >
                  <div className="h-1/2 bg-gray-200 dark:bg-gray-800" />
                  <div className="p-6 space-y-4">
                    <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-20">{error}</div>
        ) : (
          <DepartmentsGrid departments={departments} />
        )}
      </section>

      <AppointmentCTA
        variant="large"
        className="my-12 md:my-16 lg:my-20 mx-4 md:mx-8 lg:mx-auto max-w-6xl rounded-3xl"
      />
    </div>
  );
}
