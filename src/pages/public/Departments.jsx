import { useState, useEffect, lazy } from "react";
import { useLocation } from "react-router-dom";
import { getAllDepartments } from "../../api/departmentsApi";

const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const DepartmentsGrid = lazy(
  () => import("../../sections/departments/DepartmentsGrid"),
);
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

export default function Departments() {
  const location = useLocation();

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
  }, [location.key]); // important

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
            <DepartmentsGrid departments={departments} />
          )}
        </div>
      </section>

      <AppointmentCTA className="my-16 mx-auto max-w-6xl" />
    </main>
  );
}
