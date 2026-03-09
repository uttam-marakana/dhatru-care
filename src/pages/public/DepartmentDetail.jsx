import { useParams, Link } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import { FaStethoscope, FaChartLine, FaStar } from "react-icons/fa";

import { getDepartmentBySlug } from "../../api/departmentsApi";
import { getDoctors } from "../../api/doctorsApi";
import { getDoctorSpecialtiesFromDepartment } from "../../utils/departmentDoctorMap";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));
const Card = lazy(() => import("../../components/common/Card"));
const Breadcrumb = lazy(() => import("../../components/common/Breadcrumb"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

export default function DepartmentDetail() {
  const { slug } = useParams();

  const [department, setDepartment] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const dept = await getDepartmentBySlug(slug);

        if (!mounted) return;

        if (!dept) {
          setError("Department not found");
          return;
        }

        setDepartment(dept);

        const specialties = getDoctorSpecialtiesFromDepartment(dept.slug);

        const allDoctors = await getDoctors();

        const filteredDoctors = allDoctors.filter((doc) =>
          specialties.some(
            (s) => doc.specialty?.toLowerCase() === s.toLowerCase(),
          ),
        );

        setRelatedDoctors(filteredDoctors.slice(0, 4));
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load department");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (slug) fetchData();

    return () => (mounted = false);
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gray-950">
        Loading department...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gray-950">
        {error}
      </div>
    );

  return (
    <main
      className="
      min-h-screen
      bg-gradient-to-b
      from-gray-50 via-gray-100 to-gray-50
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
      "
    >
      {/* Breadcrumb */}

      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Departments", path: "/departments" },
          { label: department.name },
        ]}
      />

      {/* HERO */}

      <section className="relative py-20 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[140px] rounded-full" />

        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-7xl mb-6">{department.icon || "🏥"}</div>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">
              {department.name}
            </h1>

            <p className="text-gray-500 dark:text-gray-400">
              {department.description ||
                "Specialized care with advanced facilities."}
            </p>
          </div>
        </Container>
      </section>

      {/* CONTENT */}

      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SERVICES */}

            <Card className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaStethoscope className="text-blue-400" />
                Our Services
              </h2>

              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {department.services?.map((s, i) => (
                  <li key={i}>✔ {s}</li>
                ))}
              </ul>
            </Card>

            {/* HIGHLIGHTS */}

            <Card className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaChartLine className="text-blue-400" />
                Highlights
              </h2>

              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {department.highlights?.map((h, i) => (
                  <li key={i}>★ {h}</li>
                ))}
              </ul>
            </Card>

            {/* CTA */}

            <Card className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition">
              <h2 className="text-xl font-bold mb-4">Why Choose Us?</h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Expert doctors and advanced medical technology for better care.
              </p>

              <Button
                as={Link}
                to={`/appointments?department=${department.slug}`}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Book Consultation
              </Button>
            </Card>
          </div>
        </Container>
      </section>

      {/* RELATED DOCTORS */}

      {relatedDoctors.length > 0 && (
        <section className="py-20 bg-gray-100 dark:bg-gray-900">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">
              Specialists in {department.name}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDoctors.map((doc) => (
                <Link key={doc.id} to={`/doctors/${doc.id}`}>
                  <Card className="p-6 text-center hover:-translate-y-2 transition">
                    <div className="text-6xl mb-4">
                      {doc.imagePlaceholder || "👨‍⚕️"}
                    </div>

                    <h3 className="font-semibold">{doc.name}</h3>

                    <p className="text-blue-400 text-sm">{doc.specialty}</p>

                    <div className="flex justify-center gap-1 text-sm text-gray-400 mt-2">
                      <FaStar className="text-yellow-400" />
                      {doc.rating || 4.9}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <AppointmentCTA className="my-16 mx-auto max-w-6xl" />
    </main>
  );
}
