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
        {" "}
        <p className="text-center py-20 text-[var(--text-secondary)]">
          No departments found.{" "}
        </p>{" "}
      </Container>
    );
  }

  return (
    <Container>
      <div
        className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-8
  "
      >
        {departments.map((dept) => (
          <Link
            key={dept.id}
            to={`/departments/${dept.slug}`}
            className="block group h-full"
          >
            <Card
              className="
          h-full flex flex-col
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-2xl
          p-8
          text-center
          transition-all duration-500
          hover:-translate-y-2
          hover:border-[var(--color-primary)]/40
          hover:shadow-[0_0_40px_var(--glow-soft)]
          "
            >
              <div className="text-6xl mb-6">{dept.icon || "🏥"}</div>

              <h3
                className="
          text-xl
          font-semibold
          mb-3
          text-[var(--text)]
          group-hover:text-[var(--color-primary)]
          transition-colors
          "
              >
                {dept.name}
              </h3>

              <p
                className="
          text-[var(--text-secondary)]
          mb-6
          text-sm
          leading-relaxed
          "
              >
                {dept.shortDesc}
              </p>

              <div className="mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="
              text-[var(--color-primary)]
              hover:text-(--color-primary-hover)
              "
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
