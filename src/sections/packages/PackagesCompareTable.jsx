import { lazy, useMemo } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));

export default function PackagesCompareTable({
  packages = [],
  loading,
  error,
  recommendedPackage = null,
}) {
  /* ===============================
     STATES
  ================================= */
  if (loading) {
    return (
      <Container className="py-16">
        <div className="animate-pulse h-80 bg-white dark:bg-gray-900 rounded-xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-16 text-center text-red-600">{error}</Container>
    );
  }

  if (!packages.length) {
    return (
      <Container className="py-16 text-center text-gray-500">
        No packages found.
      </Container>
    );
  }

  /* ===============================
     HELPERS
  ================================= */
  const parsePrice = (price = "") => Number(price.replace(/[^\d]/g, "")) || 0;

  /* ===============================
     BEST VALUE (MOST TESTS)
  ================================= */
  const bestValueId = useMemo(() => {
    let best = null;
    let max = -1;

    packages.forEach((p) => {
      const count = p.includes?.length || 0;
      if (count > max) {
        max = count;
        best = p.id;
      }
    });

    return best;
  }, [packages]);

  /* ===============================
     AUTO RECOMMENDED (fallback)
  ================================= */
  const autoRecommendedId = useMemo(() => {
    if (!packages.length) return null;

    const prices = packages.map((p) => parsePrice(p.price));

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    let bestScore = -1;
    let best = null;

    packages.forEach((pkg) => {
      const includes = pkg.includes?.length || 0;
      const price = parsePrice(pkg.price);

      const affordability =
        maxPrice === minPrice
          ? 1
          : 1 - (price - minPrice) / (maxPrice - minPrice);

      const score = includes * 0.6 + affordability * 0.4;

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

  /* ===============================
     UI
  ================================= */
  return (
    <section className="py-12 md:py-20">
      <Container>
        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto rounded-xl border bg-white dark:bg-gray-900">
          <table className="w-full text-left">
            <thead className="bg-primary/10">
              <tr>
                <th className="p-5 text-lg font-bold">Features</th>

                {packages.map((pkg) => (
                  <th
                    key={pkg.id}
                    className={`p-5 text-center relative ${
                      isRecommended(pkg)
                        ? "bg-primary/15 border-x-2 border-primary"
                        : ""
                    }`}
                  >
                    {isRecommended(pkg) && (
                      <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                        ⭐ Recommended
                      </span>
                    )}

                    {!isRecommended(pkg) && isBestValue(pkg) && (
                      <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        🔥 Best Value
                      </span>
                    )}

                    <div className="font-bold text-primary text-lg">
                      {pkg.name}
                    </div>

                    <div className="text-2xl font-extrabold mt-2">
                      {pkg.price}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-5 font-semibold">Tests Included</td>

                {packages.map((pkg) => (
                  <td
                    key={pkg.id}
                    className={`p-5 align-top ${
                      isRecommended(pkg) ? "border-x-2 border-primary/40" : ""
                    }`}
                  >
                    <ul className="space-y-2">
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

              <tr className="border-t">
                <td className="p-5 font-semibold">Action</td>

                {packages.map((pkg) => (
                  <td
                    key={pkg.id}
                    className={`p-5 text-center ${
                      isRecommended(pkg) ? "border-x-2 border-primary/40" : ""
                    }`}
                  >
                    <Button
                      className={`w-full ${
                        isRecommended(pkg) ? "bg-primary text-white" : ""
                      }`}
                    >
                      Book Now
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="lg:hidden grid gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white dark:bg-gray-900 rounded-xl border p-6 relative ${
                isRecommended(pkg) ? "border-primary shadow-lg" : ""
              }`}
            >
              {isRecommended(pkg) && (
                <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  ⭐ Recommended
                </span>
              )}

              {!isRecommended(pkg) && isBestValue(pkg) && (
                <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  🔥 Best Value
                </span>
              )}

              <h3 className="text-xl font-bold text-primary mb-2">
                {pkg.name}
              </h3>

              <p className="text-2xl font-extrabold mb-4">{pkg.price}</p>

              <ul className="space-y-2 mb-6">
                {(pkg.includes || []).map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-500">✔</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  isRecommended(pkg) ? "bg-primary text-white" : ""
                }`}
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
