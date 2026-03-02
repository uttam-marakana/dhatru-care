import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStethoscope, FaChartLine } from "react-icons/fa";
import { getDepartmentBySlug } from "../api/departmentsApi"; // ← your Firebase API

const Container = lazy(() => import("../components/layout/Container"));
const Button = lazy(() => import("../components/common/Button"));
const Card = lazy(() => import("../components/common/Card"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));

function DepartmentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-800 h-64 md:h-96 py-20 md:py-32">
        <Container>
          <div className="text-center max-w-5xl mx-auto">
            <div className="h-32 w-32 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full mb-6" />
            <div className="h-12 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-4" />
            <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
          </div>
        </Container>
      </div>

      <section className="py-12 md:py-20">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-8">
              <div className="h-10 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default function DepartmentDetail() {
  const { slug } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getDepartmentBySlug(slug);
        if (data) {
          setDepartment(data);
        } else {
          setError("Department not found");
        }
      } catch (err) {
        setError("Failed to load department details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [slug]);

  if (loading) return <DepartmentDetailSkeleton />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  if (!department) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Banner / Hero */}
      <div
        className={`bg-linear-to-br ${department.bgGradient || "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"} py-12 md:py-20 lg:py-24`}
      >
        <Container>
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-8xl md:text-9xl mb-6">
              {department.icon || "🏥"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {department.name}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              {department.description ||
                "Specialized care with advanced facilities."}
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-20 lg:py-24">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Services */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <FaStethoscope className="text-primary" />
                Our Services
              </h2>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                {department.services?.length > 0 ? (
                  department.services.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-lg">
                      <span className="text-green-500 mt-1 text-xl">✔</span>
                      <span>{service}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No services listed
                  </p>
                )}
              </ul>
            </Card>

            {/* Highlights */}
            <Card className="col-span-1 md:col-span-1 lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <FaChartLine className="text-primary" />
                Key Highlights
              </h2>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                {department.highlights?.length > 0 ? (
                  department.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-lg">
                      <span className="text-primary mt-1 text-xl">★</span>
                      <span>{highlight}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No highlights listed
                  </p>
                )}
              </ul>

              <p className="mt-8 text-lg font-medium text-primary">
                {department.doctorsCount || 0} Expert Specialists Available
              </p>
            </Card>

            {/* Quick Stats / CTA */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Why Choose Us?
              </h2>
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                <p>• 24×7 Emergency & Critical Care Support</p>
                <p>• Advanced Diagnostic & Therapeutic Facilities</p>
                <p>• Multidisciplinary Team Approach</p>
                <p>• Patient-Centered Care & Rehabilitation</p>
              </div>

              <div className="mt-10">
                <Button size="lg" className="w-full">
                  Book Consultation
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <AppointmentCTA
        variant="large"
        className="my-12 md:my-16 lg:my-20 mx-4 md:mx-8 lg:mx-auto max-w-6xl rounded-3xl"
      />
    </div>
  );
}
