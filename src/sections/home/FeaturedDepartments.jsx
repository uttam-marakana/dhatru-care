import { lazy } from "react";
import { Link } from "react-router-dom";

import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";

export default function FeaturedDepartments({
  departments = [],
  loading = false,
}) {
  if (loading)
    return (
      <section className="py-24 text-center text-[var(--text-secondary)] bg-[var(--section)]">
        Loading departments...
      </section>
    );

  return (
    <section className="relative py-20 md:py-24 bg-[var(--section)] text-[var(--text)] overflow-hidden">
      {/* Background Glow */}
      <div
        className="
        pointer-events-none
        absolute -top-40 left-1/2 -translate-x-1/2
        w-[700px] md:w-[900px]
        h-[700px] md:h-[900px]
        bg-[var(--glow-bg)]
        blur-[140px]
        rounded-full
        opacity-70
        z-0
        "
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            Our Specialized Departments
          </h2>

          <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Comprehensive care across multiple specialties supported by advanced
            medical infrastructure.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.slice(0, 4).map((dept) => (
            <Link
              key={dept.id}
              to={`/departments/${dept.slug}`}
              className="
              group
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
              <div className="text-4xl mb-4 text-[var(--color-primary)]">
                {dept.icon || "🏥"}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-[var(--text)]">
                {dept.name}
              </h3>

              <p className="text-[var(--text-secondary)] mb-6">
                {dept.shortDesc}
              </p>

              <Button variant="ghost" size="sm">
                Explore →
              </Button>
            </Link>
          ))}
        </div>

        {departments.length > 4 && (
          <div className="text-center mt-14">
            <Link to="/departments">
              <Button size="lg">View All Departments</Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
