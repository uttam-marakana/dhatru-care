import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

export default function DepartmentsGrid({ departments = [] }) {
  if (!departments.length) {
    return (
      <Container>
        <p className="text-center py-20 text-gray-500">No departments found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {departments.map((dept) => (
          <Link
            key={dept.id}
            to={`/departments/${dept.slug}`}
            className="block group h-full"
          >
            <Card
              hover
              className="h-full flex flex-col bg-linear-to-br from-primary/5 to-secondary/5"
            >
              <div className="p-6 md:p-8 text-center flex flex-col h-full">
                <div className="text-6xl mb-5">{dept.icon || "🏥"}</div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary">
                  {dept.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                  {dept.shortDesc}
                </p>

                <div className="mt-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    rightIcon={<FaArrowRight />}
                  >
                    Explore Department
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
