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
      } catch {
        if (mounted) setError("Failed to load departments");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, []);

  return (
    <main className="min-h-screen bg-(--bg) text-(--text)">
      <PageHero
        title="Our Specialities"
        subtitle="Comprehensive multispeciality care with expert teams."
      />

      <section className="py-20 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-175 h-175 bg-(--glow-bg) blur-[160px] rounded-full">
          <div className="relative z-10">
            {loading ? (
              <p className="text-center py-20 text-(--text-secondary)">
                Loading departments...
              </p>
            ) : error ? (
              <p className="text-center text-red-400 py-20">{error}</p>
            ) : (
              <DepartmentsGrid departments={departments} />
            )}
          </div>
        </div>
      </section>

      <AppointmentCTA className="my-16 mx-auto max-w-6xl" />
    </main>
  );
}
