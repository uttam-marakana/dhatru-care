import { lazy } from "react";
import { Link } from "react-router-dom";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

export default function HealthPackages({
  packages = [],
  loading = false,
  error = null,
  fullWidth = false,
}) {
  /* ===============================
     LOADING STATE
  ================================= */
  if (loading) {
    return (
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white dark:bg-gray-900 rounded-xl h-96"
            />
          ))}
        </div>
      </Container>
    );
  }

  /* ===============================
     ERROR STATE
  ================================= */
  if (error) {
    return (
      <Container>
        <div className="text-center text-red-600 py-16">{error}</div>
      </Container>
    );
  }

  /* ===============================
     EMPTY STATE
  ================================= */
  if (!packages.length) {
    return (
      <Container>
        <div className="text-center py-20 text-gray-500">
          No packages available.
        </div>
      </Container>
    );
  }

  return (
    <section className="bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Preventive Health Packages
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Early detection is the best protection — choose the right package
            for you and your family.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 ${
            fullWidth
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-4"
          } gap-6 md:gap-8`}
        >
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              hover
              className="text-center group border-2 border-transparent hover:border-primary/30 transition-all"
            >
              <div className="bg-primary/10 py-6 px-4 rounded-t-xl">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {pkg.name}
                </h3>

                <p className="text-3xl font-extrabold">{pkg.price}</p>
              </div>

              <div className="p-6">
                <ul className="space-y-3 text-left mb-6">
                  {(pkg.includes || []).map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-500">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button className="w-full">Book Now</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/packages/compare">
            <Button variant="outline" size="lg">
              Compare All Packages →
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
