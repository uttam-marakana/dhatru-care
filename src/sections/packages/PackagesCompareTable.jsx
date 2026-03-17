import { useMemo, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaMinus } from "react-icons/fa";

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
  const [spotlight, setSpotlight] = useState(true);
  const [search, setSearch] = useState("");

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
    return 0;
  };

  /* ---------------- AI RECOMMENDATION ENGINE ---------------- */

  const recommendedId = useMemo(() => {
    if (recommendedPackage?.id) return recommendedPackage.id;

    let bestScore = -1;
    let best = null;

    packages.forEach((pkg) => {
      const tests = pkg.includes?.length || 0;
      const price = parsePrice(pkg.price);

      const score = tests * 0.7 + (1 / price) * 0.3;

      if (score > bestScore) {
        bestScore = score;
        best = pkg.id;
      }
    });

    return best;
  }, [packages, recommendedPackage]);

  const isRecommended = (pkg) => pkg.id === recommendedId;

  /* ---------------- FEATURE MATRIX ---------------- */

  const features = useMemo(() => {
    const set = new Set();

    packages.forEach((pkg) => {
      (pkg.includes || []).forEach((f) => set.add(f));
    });

    return Array.from(set);
  }, [packages]);

  /* ---------------- FEATURE SEARCH ---------------- */

  const filteredFeatures = useMemo(() => {
    if (!search) return features;

    return features.filter((f) =>
      f.toLowerCase().includes(search.toLowerCase()),
    );
  }, [features, search]);

  /* ---------------- FEATURE GROUPING ---------------- */

  const groupedFeatures = useMemo(() => {
    const groups = {
      Diagnostics: [],
      BloodPanels: [],
      Screening: [],
      Other: [],
    };

    filteredFeatures.forEach((feature) => {
      const f = feature.toLowerCase();

      if (f.includes("blood")) groups.BloodPanels.push(feature);
      else if (f.includes("test")) groups.Diagnostics.push(feature);
      else if (f.includes("screen")) groups.Screening.push(feature);
      else groups.Other.push(feature);
    });

    return groups;
  }, [filteredFeatures]);

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
        No packages available.
      </Container>
    );
  }

  return (
    <section className="py-20">
      <Container>
        {/* SEARCH */}

        <div className="flex justify-between mb-8 flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search features..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ui-input max-w-xs"
          />

          <button
            onClick={() => setSpotlight(!spotlight)}
            className="border px-4 py-2 rounded-lg"
          >
            {spotlight ? "Disable" : "Enable"} Spotlight
          </button>
        </div>

        {/* MOBILE SLIDER */}

        <div className="lg:hidden flex gap-4 overflow-x-auto pb-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`min-w-[260px] border rounded-xl p-6 bg-[var(--card)]
                ${isRecommended(pkg) ? "ring-2 ring-[var(--color-primary)]" : ""}
              `}
            >
              {isRecommended(pkg) && (
                <span className="text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded">
                  Recommended
                </span>
              )}

              <h3 className="font-semibold mt-2">{pkg.name}</h3>

              <div className="text-2xl font-bold text-[var(--color-primary)] mt-2">
                ₹{parsePrice(pkg.price)}
              </div>

              <ul className="mt-4 space-y-2 text-sm">
                {(pkg.includes || []).slice(0, 5).map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> {i}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full mt-4"
                onClick={() => navigate(`/appointment?package=${pkg.id}`)}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden lg:block overflow-x-auto border rounded-xl bg-[var(--card)]">
          <table className="min-w-[1200px] w-full text-sm">
            <thead className="sticky top-0 bg-[var(--card)] z-20">
              <tr>
                <th className="sticky left-0 bg-[var(--card)] p-6 z-30 min-w-[260px] text-left">
                  Features
                </th>

                {packages.map((pkg) => (
                  <th
                    key={pkg.id}
                    onMouseEnter={() => setActiveColumn(pkg.id)}
                    onMouseLeave={() => setActiveColumn(null)}
                    className={`
                      p-6 min-w-[240px] text-center transition-all duration-300
                      ${activeColumn === pkg.id ? "bg-[var(--surface)] scale-[1.02]" : ""}
                      ${
                        spotlight && isRecommended(pkg)
                          ? "bg-[var(--color-primary)]/10 border-x-2 border-[var(--color-primary)] shadow-[0_0_30px_var(--glow-soft)]"
                          : ""
                      }
                    `}
                  >
                    {isRecommended(pkg) && (
                      <span className="text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}

                    <div className="font-semibold text-lg mt-2">{pkg.name}</div>

                    <div className="text-2xl font-bold text-[var(--color-primary)] mt-1">
                      ₹{parsePrice(pkg.price)}
                    </div>

                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => navigate(`/appointment?package=${pkg.id}`)}
                    >
                      Book
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Object.entries(groupedFeatures).map(([group, items]) => (
                <Fragment key={group}>
                  {items.length > 0 && (
                    <tr className="bg-[var(--surface)]">
                      <td
                        colSpan={packages.length + 1}
                        className="text-xs uppercase font-bold px-6 py-3"
                      >
                        {group}
                      </td>
                    </tr>
                  )}

                  {items.map((feature) => (
                    <tr
                      key={feature}
                      className="border-t border-[var(--border)]"
                    >
                      <td className="sticky left-0 bg-[var(--card)] p-6 font-semibold">
                        {feature}
                      </td>

                      {packages.map((pkg) => (
                        <td
                          key={pkg.id}
                          className={`text-center p-6 ${
                            activeColumn === pkg.id ? "bg-[var(--surface)]" : ""
                          }`}
                        >
                          {(pkg.includes || []).includes(feature) ? (
                            <FaCheckCircle className="text-green-500 mx-auto" />
                          ) : (
                            <FaMinus className="text-gray-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}

        {recommendedId && (
          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              onClick={() => navigate(`/appointment?package=${recommendedId}`)}
            >
              Book Recommended Plan
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
