import { useParams, Link } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import { FaStethoscope, FaChartLine, FaStar } from "react-icons/fa";

import { getDepartmentBySlug } from "../api/departmentsApi";
import { getDoctors } from "../api/doctorsApi";
import { getDoctorSpecialtiesFromDepartment } from "../utils/departmentDoctorMap";

/* LAZY IMPORTS */
const Container = lazy(() => import("../components/layout/Container"));
const Button = lazy(() => import("../components/common/Button"));
const Card = lazy(() => import("../components/common/Card"));
const Breadcrumb = lazy(() => import("../components/common/Breadcrumb"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));

/* ===============================
   PAGE
================================= */
export default function DepartmentDetail() {
  const { slug } = useParams();

  const [department, setDepartment] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ===============================
     FETCH DATA
  ================================= */
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        /* FETCH DEPARTMENT */
        const dept = await getDepartmentBySlug(slug);

        if (!mounted) return;

        if (!dept) {
          setError("Department not found");
          return;
        }

        setDepartment(dept);

        /* SMART DOCTOR MAPPING */
        const specialties = getDoctorSpecialtiesFromDepartment(dept.slug);

        const allDoctors = await getDoctors();

        if (!mounted) return;

        const filteredDoctors = allDoctors.filter((doc) =>
          specialties.some(
            (s) => doc.specialty?.toLowerCase() === s.toLowerCase(),
          ),
        );

        setRelatedDoctors(filteredDoctors.slice(0, 4));
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load department details");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (slug) fetchData();

    return () => {
      mounted = false;
    };
  }, [slug]);

  /* ===============================
     STATES
  ================================= */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading department...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  if (!department) return null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Departments", path: "/departments" },
          { label: department.name },
        ]}
      />

      {/* HERO */}
      <div
        className={`bg-linear-to-br ${
          department.bgGradient ||
          "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
        } py-12 md:py-20 lg:py-24`}
      >
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-7xl md:text-8xl mb-6">
              {department.icon || "🏥"}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {department.name}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              {department.description ||
                "Specialized care with advanced facilities."}
            </p>
          </div>
        </Container>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SERVICES */}
            <Card>
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
                <FaStethoscope className="text-primary" />
                Our Services
              </h2>

              <ul className="space-y-3">
                {department.services?.length ? (
                  department.services.map((s, i) => <li key={i}>✔ {s}</li>)
                ) : (
                  <p className="text-gray-500">No services listed</p>
                )}
              </ul>
            </Card>

            {/* HIGHLIGHTS */}
            <Card>
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
                <FaChartLine className="text-primary" />
                Highlights
              </h2>

              <ul className="space-y-3">
                {department.highlights?.length ? (
                  department.highlights.map((h, i) => <li key={i}>★ {h}</li>)
                ) : (
                  <p className="text-gray-500">No highlights listed</p>
                )}
              </ul>

              <p className="mt-6 text-primary font-semibold">
                {department.doctorsCount || 0} Specialists Available
              </p>
            </Card>

            {/* CTA */}
            <Card>
              <h2 className="text-2xl font-bold mb-5">Why Choose Us?</h2>

              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• 24×7 Emergency Support</p>
                <p>• Advanced Diagnostics</p>
                <p>• Multidisciplinary Team</p>
                <p>• Patient-Centered Care</p>
              </div>

              <Button className="w-full mt-6">Book Consultation</Button>
            </Card>
          </div>
        </Container>
      </section>

      {/* RELATED DOCTORS */}
      {relatedDoctors.length > 0 && (
        <section className="py-12 md:py-16">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-10">
              Specialists in {department.name}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDoctors.map((doc) => (
                <Link key={doc.id} to={`/doctors/${doc.id}`}>
                  <Card hover className="text-center p-5">
                    <div className="text-6xl mb-3">
                      {doc.imagePlaceholder || "👨‍⚕️"}
                    </div>

                    <h3 className="font-bold">{doc.name}</h3>

                    <p className="text-primary text-sm mb-2">{doc.specialty}</p>

                    <div className="flex justify-center items-center gap-1 text-sm">
                      <FaStar className="text-yellow-500" />
                      {doc.rating || 4.9}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <AppointmentCTA
        variant="large"
        className="my-12 md:my-16 lg:my-20 mx-auto max-w-6xl"
      />
    </main>
  );
}
