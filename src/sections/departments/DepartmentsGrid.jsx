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
        <p className="text-center py-20 text-gray-400">No departments found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {departments.map((dept) => (
          <Link
            key={dept.id}
            to={`/departments/${dept.slug}`}
            className="block group h-full"
          >
            <Card className="h-full flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <div className="text-6xl mb-6">{dept.icon || "🏥"}</div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                {dept.name}
              </h3>

              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {dept.shortDesc}
              </p>

              <div className="mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300"
                  rightIcon={<FaArrowRight />}
                >
                  Explore Department
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
