import { lazy } from "react";
import { Link } from "react-router-dom";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

export default function FeaturedDepartments({
  departments = [],
  loading = false,
}) {
  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.slice(0, 4).map((dept) => (
            <Link key={dept.id} to={`/departments/${dept.slug}`}>
              <Card hover className="text-center">
                <div className="text-5xl mb-4">{dept.icon || "🏥"}</div>
                <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dept.shortDesc}
                </p>
                <Button variant="ghost" size="sm" className="mt-4">
                  Explore →
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
