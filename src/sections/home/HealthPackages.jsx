import { lazy } from "react";
import { Link } from "react-router-dom";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));

export default function HealthPackages({ packages = [], loading, error }) {
  if (loading)
    return (
      <div className="text-center py-24 text-[var(--text-secondary)] bg-[var(--bg)]">
        Loading packages...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-24 text-red-500 bg-[var(--bg)]">
        {error}
      </div>
    );

  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-162.5 h-162.5 bg-(--glow-bg) blur-[140px] rounded-full"></div>

      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            Comprehensive Health Packages
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[var(--card)] border border-[var(--border)]
              rounded-2xl p-6 flex flex-col
              hover:border-[var(--color-primary)]/40
              hover:shadow-[0_0_40px_var(--glow-soft)]"
            >
              <h3 className="font-semibold mb-2">{pkg.name}</h3>

              <p className="text-3xl font-bold text-[var(--color-primary)] mb-6">
                {pkg.price}
              </p>

              <ul className="space-y-2 text-[var(--text-secondary)] mb-6">
                {(pkg.includes || []).map((i, idx) => (
                  <li key={idx}>✔ {i}</li>
                ))}
              </ul>

              <Button className="mt-auto w-full">Book Now</Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link to="/packages/compare">
            <Button variant="ghost" size="lg">
              Compare Packages →
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
