import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";

export default function HealthPackages({ packages = [], loading, error }) {
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="text-center py-24 text-[var(--text-secondary)] bg-[var(--section)]">
        Loading packages...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-24 text-red-500 bg-[var(--section)]">
        {error}
      </div>
    );

  return (
    <section className="relative py-20 md:py-24 bg-[var(--section)] text-[var(--text)] overflow-hidden">
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            Comprehensive Health Packages
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="
              group
              bg-[var(--card)]
              border border-[var(--border)]
              rounded-2xl
              p-6
              flex flex-col
              transition-all duration-500
              hover:-translate-y-2
              hover:border-[var(--color-primary)]/40
              hover:shadow-[0_0_40px_var(--glow-soft)]
              "
            >
              <h3 className="font-semibold mb-2 text-[var(--text)]">
                {pkg.name}
              </h3>

              <p className="text-3xl font-bold text-[var(--color-primary)] mb-6">
                {pkg.price}
              </p>

              <ul className="space-y-2 text-[var(--text-secondary)] mb-6">
                {(pkg.includes || []).map((i, idx) => (
                  <li key={idx}>✔ {i}</li>
                ))}
              </ul>

              <Button
                className="mt-auto w-full"
                onClick={() => navigate(`/appointment?package=${pkg.id}`)}
              >
                Book Now
              </Button>
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
