import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";

export default function PackagesCompareTable({
  packages = [],
  loading,
  error,
  recommendedPackage,
}) {
  const navigate = useNavigate();
  const [activeColumn, setActiveColumn] = useState(null);

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
    return 0;
  };

  /* ---------------- BEST VALUE ---------------- */

  const bestValueId = useMemo(() => {
    if (!packages.length) return null;

    let best = null;
    let maxTests = -1;

    packages.forEach((pkg) => {
      const count = pkg.includes?.length || 0;

      if (count > maxTests) {
        maxTests = count;
        best = pkg.id;
      }
    });

    return best;
  }, [packages]);

  /* ---------------- AI RECOMMENDED ---------------- */

  const autoRecommendedId = useMemo(() => {
    if (!packages.length) return null;

    const prices = packages.map((p) => parsePrice(p.price));

    const max = Math.max(...prices);
    const min = Math.min(...prices);

    let bestScore = -1;
    let best = null;

    packages.forEach((pkg) => {
      const tests = pkg.includes?.length || 0;
      const price = parsePrice(pkg.price);

      const affordability = max === min ? 1 : 1 - (price - min) / (max - min);

      const score = tests * 0.6 + affordability * 0.4;

      if (score > bestScore) {
        bestScore = score;
        best = pkg.id;
      }
    });

    return best;
  }, [packages]);

  const isRecommended = (pkg) =>
    recommendedPackage
      ? pkg.id === recommendedPackage.id
      : pkg.id === autoRecommendedId;

  const isBestValue = (pkg) => pkg.id === bestValueId;

  /* ---------------- FEATURE MATRIX ---------------- */

  const features = useMemo(() => {
    const set = new Set();

    packages.forEach((pkg) => {
      (pkg.includes || []).forEach((feature) => {
        set.add(feature);
      });
    });

    return Array.from(set);
  }, [packages]);

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <Container className="py-16">
        <div className="animate-pulse h-80 bg-[var(--card)] border border-[var(--border)] rounded-xl"></div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-16 text-center text-red-500">{error}</Container>
    );
  }

  if (!packages.length) {
    return (
      <Container className="py-16 text-center text-[var(--text-secondary)]">
        No packages available for this category.
      </Container>
    );
  }

  return (
    <section className="py-16">
      <Container>
        {/* ---------- MOBILE CARD VIEW ---------- */}

        <div className="lg:hidden space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border border-[var(--border)] rounded-xl p-6 bg-[var(--card)]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{pkg.name}</h3>
                  <div className="text-[var(--color-primary)] text-xl font-bold">
                    ₹{parsePrice(pkg.price)}
                  </div>
                </div>

                {isRecommended(pkg) && (
                  <span className="text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded-full">
                    Recommended
                  </span>
                )}
              </div>

              <ul className="space-y-2 text-sm text-[var(--text-secondary)] mb-4">
                {(pkg.includes || []).map((item, i) => (
                  <li key={i}>✔ {item}</li>
                ))}
              </ul>

              <Button
                className="w-full"
                onClick={() => navigate(`/appointment?package=${pkg.id}`)}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>

        {/* ---------- DESKTOP TABLE ---------- */}

        <div className="hidden lg:block overflow-x-auto border rounded-xl bg-[var(--card)]">
          <table className="min-w-[1000px] w-full text-sm">
            {/* HEADER */}

            <thead className="sticky top-0 z-20 bg-[var(--card)]">
              <tr>
                <th className="sticky left-0 bg-[var(--card)] p-6 z-30 font-bold">
                  Features
                </th>

                {packages.map((pkg) => (
                  <th
                    key={pkg.id}
                    onMouseEnter={() => setActiveColumn(pkg.id)}
                    onMouseLeave={() => setActiveColumn(null)}
                    className={`
                      p-6 min-w-[240px] text-center relative transition
                      ${activeColumn === pkg.id ? "bg-[var(--surface)]" : ""}
                      ${
                        isRecommended(pkg)
                          ? "bg-[var(--color-primary)]/10 border-x-2 border-[var(--color-primary)]"
                          : ""
                      }
                    `}
                  >
                    {isRecommended(pkg) && (
                      <span className="absolute top-3 right-3 bg-[var(--color-primary)] text-white text-xs px-2 py-1 rounded-full">
                        ⭐ Recommended
                      </span>
                    )}

                    {!isRecommended(pkg) && isBestValue(pkg) && (
                      <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        🔥 Best Value
                      </span>
                    )}

                    <div className="text-lg font-bold">{pkg.name}</div>

                    <div className="text-2xl font-bold mt-2 text-[var(--color-primary)]">
                      ₹{parsePrice(pkg.price)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}

            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-t border-[var(--border)]">
                  <td className="sticky left-0 bg-[var(--card)] p-6 font-semibold z-10">
                    {feature}
                  </td>

                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={`p-6 text-center ${
                        activeColumn === pkg.id ? "bg-[var(--surface)]" : ""
                      }`}
                    >
                      {(pkg.includes || []).includes(feature) ? (
                        <span className="text-green-500 font-bold">✔</span>
                      ) : (
                        <span className="text-[var(--muted)]">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* ACTION */}

              <tr className="border-t border-[var(--border)]">
                <td className="sticky left-0 bg-[var(--card)] p-6 font-semibold z-10">
                  Book
                </td>

                {packages.map((pkg) => (
                  <td key={pkg.id} className="p-6 text-center">
                    <Button
                      className={`w-full ${
                        isRecommended(pkg)
                          ? "bg-[var(--color-primary)] text-white"
                          : ""
                      }`}
                      onClick={() => navigate(`/appointment?package=${pkg.id}`)}
                    >
                      Book Now
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
