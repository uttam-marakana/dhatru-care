import { lazy } from "react";
import { Link } from "react-router-dom";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));

export default function FeaturedDepartments({
  departments = [],
  loading = false,
}) {
  if (loading)
    return (
      <section className="py-24 text-center text-gray-400 bg-gray-950">
        Loading departments...
      </section>
    );

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Same Blue Aura as Facilities */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Our Specialized Departments
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Comprehensive care across multiple specialties supported by advanced
            medical infrastructure and experienced professionals.
          </p>
        </div>

        {departments.length === 0 && (
          <p className="text-center text-gray-400">Departments coming soon.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {departments.slice(0, 4).map((dept) => (
            <Link
              key={dept.id}
              to={`/departments/${dept.slug}`}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
            >
              {/* Subtle Top Accent Line (Now Blue) */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-3xl group-hover:scale-110 transition duration-500">
                {dept.icon || "🏥"}
              </div>

              <h3 className="text-xl font-semibold mb-3">{dept.name}</h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                {dept.shortDesc}
              </p>

              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-white"
              >
                Explore Department →
              </Button>
            </Link>
          ))}
        </div>

        {departments.length > 4 && (
          <div className="text-center mt-14 relative z-10">
            <Link to="/departments">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
              >
                View All Departments
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
