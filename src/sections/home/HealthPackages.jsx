import { lazy } from "react";
import { Link } from "react-router-dom";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));

export default function HealthPackages({ packages = [], loading, error }) {
  if (loading)
    return (
      <div className="text-center py-24 text-gray-400 bg-gray-950">
        Loading packages...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-24 text-red-500 bg-gray-950">{error}</div>
    );

  if (!packages.length)
    return (
      <div className="text-center py-24 text-gray-400 bg-gray-950">
        No packages available.
      </div>
    );

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Blue Glow Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Comprehensive Health Packages
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Preventive and diagnostic packages designed to safeguard your
            long-term health with affordability and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {packages.map((pkg, index) => {
            const isFeatured = index === 1;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl backdrop-blur-md border transition-all duration-500
                ${
                  isFeatured
                    ? "bg-white/10 border-blue-400/40 scale-105 shadow-[0_0_50px_rgba(59,130,246,0.35)]"
                    : "bg-white/5 border-white/10 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
                }`}
              >
                {/* Subtle Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {isFeatured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-4 py-1 rounded-full shadow-lg shadow-blue-500/30">
                    Most Popular
                  </span>
                )}

                {/* Pricing Header */}
                <div className="p-6 text-center border-b border-white/10">
                  <h3 className="font-semibold text-lg mb-2">{pkg.name}</h3>

                  <p className="text-4xl font-extrabold text-blue-400">
                    {pkg.price}
                  </p>
                </div>

                {/* Features */}
                <div className="p-6 flex flex-col flex-1">
                  <ul className="space-y-3 mb-6 text-sm text-gray-400">
                    {(pkg.includes || []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`mt-auto w-full ${
                      isFeatured
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                        : "border border-blue-400/40 text-blue-400 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-14 relative z-10">
          <Link to="/packages/compare">
            <Button
              variant="ghost"
              size="lg"
              className="text-blue-400 hover:text-white"
            >
              Compare All Packages →
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
