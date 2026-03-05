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
        setLoading(true);
        setError(null);

        const dept = await getDepartmentBySlug(slug);
        if (!mounted) return;

        if (!dept) {
          setError("Department not found");
          return;
        }

        setDepartment(dept);

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

  if (!department) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Departments", path: "/departments" },
          { label: department.name },
        ]}
      />

      {/* HERO */}
      <div className="relative py-20 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[140px] rounded-full"></div>

        <Container>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="text-7xl md:text-8xl mb-6">
              {department.icon || "🏥"}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400 tracking-tight">
              {department.name}
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {department.description ||
                "Specialized care with advanced facilities."}
            </p>
          </div>
        </Container>
      </div>

      {/* CONTENT CARDS */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SERVICES */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
                <FaStethoscope className="text-blue-400" />
                Our Services
              </h2>

              <ul className="space-y-3 text-gray-400">
                {department.services?.length ? (
                  department.services.map((s, i) => <li key={i}>✔ {s}</li>)
                ) : (
                  <p>No services listed</p>
                )}
              </ul>
            </Card>

            {/* HIGHLIGHTS */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
                <FaChartLine className="text-blue-400" />
                Highlights
              </h2>

              <ul className="space-y-3 text-gray-400">
                {department.highlights?.length ? (
                  department.highlights.map((h, i) => <li key={i}>★ {h}</li>)
                ) : (
                  <p>No highlights listed</p>
                )}
              </ul>

              <p className="mt-6 text-blue-400 font-semibold">
                {department.doctorsCount || 0} Specialists Available
              </p>
            </Card>

            {/* WHY CHOOSE US */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <h2 className="text-2xl font-bold mb-5">Why Choose Us?</h2>

              <div className="space-y-3 text-gray-400">
                <p>• 24×7 Emergency Support</p>
                <p>• Advanced Diagnostics</p>
                <p>• Multidisciplinary Team</p>
                <p>• Patient-Centered Care</p>
              </div>

              <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all duration-300">
                Book Consultation
              </Button>
            </Card>
          </div>
        </Container>
      </section>

      {/* RELATED DOCTORS */}
      {relatedDoctors.length > 0 && (
        <section className="py-20 bg-gray-900">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Specialists in {department.name}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDoctors.map((doc) => (
                <Link key={doc.id} to={`/doctors/${doc.id}`}>
                  <Card className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="text-6xl mb-3">
                      {doc.imagePlaceholder || "👨‍⚕️"}
                    </div>

                    <h3 className="font-semibold">{doc.name}</h3>

                    <p className="text-blue-400 text-sm font-medium mb-2">
                      {doc.specialty}
                    </p>

                    <div className="flex justify-center items-center gap-1 text-sm text-gray-400">
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
