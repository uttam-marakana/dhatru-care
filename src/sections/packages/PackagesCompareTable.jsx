import { lazy, useMemo } from "react";
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

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
    return 0;
  };

  /* ---------- BEST VALUE (MOST TESTS) ---------- */

  const bestValueId = useMemo(() => {
    if (!packages.length) return null;

    let best = null;
    let maxTests = -1;

    packages.forEach((pkg) => {
      const testCount = pkg.includes?.length || 0;

      if (testCount > maxTests) {
        maxTests = testCount;
        best = pkg.id;
      }
    });

    return best;
  }, [packages]);

  /* ---------- AUTO RECOMMENDED ---------- */

  const autoRecommendedId = useMemo(() => {
    if (!packages.length) return null;

    const prices = packages.map((p) => parsePrice(p.price));

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    let bestScore = -1;
    let best = null;

    packages.forEach((pkg) => {
      const tests = pkg.includes?.length || 0;
      const price = parsePrice(pkg.price);

      const affordability =
        maxPrice === minPrice
          ? 1
          : 1 - (price - minPrice) / (maxPrice - minPrice);

      const score = tests * 0.6 + affordability * 0.4;

      if (score > bestScore) {
        bestScore = score;
        best = pkg.id;
      }
    });

    return best;
  }, [packages]);

  /* ---------- FINAL RECOMMENDED ---------- */

  const isRecommended = (pkg) =>
    recommendedPackage
      ? pkg.id === recommendedPackage.id
      : pkg.id === autoRecommendedId;

  const isBestValue = (pkg) => pkg.id === bestValueId;

  /* ---------- LOADING ---------- */

  if (loading) {
    return (
      <Container className="py-16">
        <div className="animate-pulse h-80 bg-[var(--card)] border border-[var(--border)] rounded-xl"></div>
      </Container>
    );
  }

  /* ---------- ERROR ---------- */

  if (error) {
    return (
      <Container className="py-16 text-center text-red-500">{error}</Container>
    );
  }

  /* ---------- EMPTY STATE ---------- */

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
        <div className="overflow-x-auto border rounded-xl bg-[var(--card)]">
          <table className="min-w-237.5 w-full">
            {/* ---------- HEADER ---------- */}

            <thead>
              <tr>
                <th className="sticky left-0 bg-[var(--card)] p-6 font-bold z-10">
                  Features
                </th>

                {packages.map((pkg) => (
                  <th
                    key={pkg.id}
                    className={`p-6 min-w-60 text-center relative
                    ${
                      isRecommended(pkg)
                        ? "bg-[var(--color-primary)]/10 border-x-2 border-[var(--color-primary)]"
                        : ""
                    }`}
                  >
                    {/* Recommended Badge */}

                    {isRecommended(pkg) && (
                      <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                        ⭐ Recommended
                      </span>
                    )}

                    {/* Best Value Badge */}

                    {!isRecommended(pkg) && isBestValue(pkg) && (
                      <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
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

            {/* ---------- BODY ---------- */}

            <tbody>
              {/* Tests */}

              <tr className="border-t border-[var(--border)]">
                <td className="sticky left-0 bg-[var(--card)] p-6 font-semibold">
                  Tests Included
                </td>

                {packages.map((pkg) => (
                  <td key={pkg.id} className="p-6 align-top">
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                      {(pkg.includes || []).map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-green-500">✔</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Action */}

              <tr className="border-t border-[var(--border)]">
                <td className="sticky left-0 bg-[var(--card)] p-6 font-semibold">
                  Action
                </td>

                {packages.map((pkg) => (
                  <td key={pkg.id} className="p-6 text-center">
                    <Button
                      className={`w-full ${
                        isRecommended(pkg) ? "bg-primary text-white" : ""
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
