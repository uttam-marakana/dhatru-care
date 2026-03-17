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
  const [selected, setSelected] = useState([]);

  /* ---------------- SELECT LOGIC ---------------- */

  const toggleSelect = (pkg) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.id === pkg.id);

      if (exists) return prev.filter((p) => p.id !== pkg.id);

      if (prev.length >= 4) return prev;

      return [...prev, pkg];
    });
  };

  const displayPackages = selected.length ? selected : packages;

  /* ---------------- HELPERS ---------------- */

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
    return 0;
  };

  /* ---------------- RECOMMENDATION ---------------- */

  const recommendedId = useMemo(() => {
    if (recommendedPackage?.id) return recommendedPackage.id;

    let bestScore = -1;
    let best = null;

    packages.forEach((pkg) => {
      const tests = pkg.includes?.length || 0;
      const price = parsePrice(pkg.price);

      const score = tests * 0.7 + (1 / (price || 1)) * 0.3;

      if (score > bestScore) {
        bestScore = score;
        best = pkg.id;
      }
    });

    return best;
  }, [packages, recommendedPackage]);

  const isRecommended = (pkg) => pkg.id === recommendedId;

  /* ---------------- FEATURES ---------------- */

  const features = useMemo(() => {
    const set = new Set();
    packages.forEach((pkg) => {
      (pkg.includes || []).forEach((f) => set.add(f));
    });
    return Array.from(set);
  }, [packages]);

  const filteredFeatures = useMemo(() => {
    if (!search) return features;
    return features.filter((f) =>
      f.toLowerCase().includes(search.toLowerCase()),
    );
  }, [features, search]);

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
        {/* SEARCH + CONTROLS */}

        <div className="flex justify-between mb-8 flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search features..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ui-input max-w-xs"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setSpotlight(!spotlight)}
              className="border px-4 py-2 rounded-lg"
            >
              {spotlight ? "Disable" : "Enable"} Spotlight
            </button>

            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                className="border px-4 py-2 rounded-lg text-red-500"
              >
                Clear Compare
              </button>
            )}
          </div>
        </div>

        {/* MOBILE VIEW */}

        <div className="lg:hidden flex gap-4 overflow-x-auto pb-4">
          {displayPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`min-w-[260px] border rounded-xl p-6 bg-[var(--card)]
              ${isRecommended(pkg) ? "ring-2 ring-[var(--color-primary)]" : ""}`}
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
                onClick={() =>
                  navigate(
                    `/appointment?package=${pkg.id}&packageName=${pkg.name}`,
                  )
                }
              >
                Book Now
              </Button>

              <button
                onClick={() => toggleSelect(pkg)}
                className="text-xs underline mt-2 w-full"
              >
                {selected.find((p) => p.id === pkg.id) ? "Remove" : "Compare"}
              </button>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden lg:block overflow-x-auto border rounded-xl bg-[var(--card)]">
          <table className="min-w-[1200px] w-full text-sm">
            <thead>
              <tr>
                <th className="p-6 text-left min-w-[260px]">Features</th>

                {displayPackages.map((pkg) => (
                  <th key={pkg.id} className="p-6 text-center min-w-[240px]">
                    <div className="space-y-2">
                      <div className="font-semibold">{pkg.name}</div>

                      <div className="text-xl font-bold text-[var(--color-primary)]">
                        ₹{parsePrice(pkg.price)}
                      </div>

                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/appointment?package=${pkg.id}&packageName=${pkg.name}`,
                          )
                        }
                      >
                        Book
                      </Button>

                      <button
                        onClick={() => toggleSelect(pkg)}
                        className="text-xs underline"
                      >
                        {selected.find((p) => p.id === pkg.id)
                          ? "Remove"
                          : "Compare"}
                      </button>
                    </div>
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
                        colSpan={displayPackages.length + 1}
                        className="px-6 py-3 font-bold text-xs uppercase"
                      >
                        {group}
                      </td>
                    </tr>
                  )}

                  {items.map((feature) => (
                    <tr key={feature}>
                      <td className="p-4 font-medium">{feature}</td>

                      {displayPackages.map((pkg) => (
                        <td key={pkg.id} className="text-center">
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
