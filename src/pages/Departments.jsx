import { useState, useEffect, lazy } from "react";
import { getAllDepartments } from "../api/departmentsApi";

const PageHero = lazy(() => import("../sections/shared/PageHero"));
const DepartmentsGrid = lazy(
  () => import("../sections/departments/DepartmentsGrid"),
);
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllDepartments();

        if (!mounted) return;
        setDepartments(data);
      } catch (err) {
        if (mounted) setError("Failed to load departments");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => (mounted = false);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <PageHero
        title="Our Specialities"
        subtitle="Comprehensive multispeciality care with expert teams."
      />

      <section className="py-12 md:py-20 lg:py-24">
        {loading ? (
          <p className="text-center py-20">Loading departments...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-20">{error}</p>
        ) : (
          <DepartmentsGrid departments={departments} />
        )}
      </section>

      <AppointmentCTA variant="large" className="my-16" />
    </main>
  );
}
