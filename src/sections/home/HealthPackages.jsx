import { lazy } from "react";
import { Link } from "react-router-dom";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

export default function HealthPackages({
  packages = [],
  loading,
  error,
  fullWidth,
}) {
  if (loading)
    return <div className="text-center py-20">Loading packages...</div>;

  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;

  if (!packages.length)
    return <div className="text-center py-20">No packages available.</div>;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div
          className={`grid grid-cols-1 ${
            fullWidth
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-4"
          } gap-6`}
        >
          {packages.map((pkg) => (
            <Card key={pkg.id} hover className="flex flex-col h-full">
              <div className="bg-primary/10 p-5 text-center">
                <h3 className="font-bold text-primary">{pkg.name}</h3>
                <p className="text-3xl font-extrabold">{pkg.price}</p>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <ul className="space-y-2 mb-5 text-sm">
                  {(pkg.includes || []).map((item, i) => (
                    <li key={i}>✔ {item}</li>
                  ))}
                </ul>

                <Button className="mt-auto w-full">Book Now</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/packages/compare">
            <Button variant="outline">Compare All Packages →</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
