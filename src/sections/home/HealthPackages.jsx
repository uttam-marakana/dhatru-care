import { useNavigate, Link } from "react-router-dom";

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
              onClick={() => navigate(`/packages/${pkg.id}`)}
              className="
              group cursor-pointer
              bg-[var(--card)]
              border border-[var(--border)]
              rounded-2xl p-6 flex flex-col
              transition-all duration-500
              hover:-translate-y-2
              hover:border-[var(--color-primary)]/40
              "
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

              <Button
                className="mt-auto w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/appointment?package=${pkg.id}&packageName=${pkg.name}`,
                  );
                }}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
