import { useEffect, useState, lazy, useRef } from "react";
import { getPackages } from "../../api/packagesApi";

import Breadcrumb from "../../components/common/Breadcrumb";

const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

const PackagesCompareTable = lazy(
  () => import("../../sections/packages/PackagesCompareTable"),
);

const PackageRecommendationQuiz = lazy(
  () => import("../../sections/packages/PackageRecommendationQuiz"),
);

export default function PackagesCompare() {
  const [packages, setPackages] = useState([]);
  const [recommended, setRecommended] = useState(null);
  const [tier, setTier] = useState("all");

  const tableRef = useRef(null);

  useEffect(() => {
    getPackages().then(setPackages);
  }, []);

  const filteredPackages =
    tier === "all"
      ? packages
      : packages.filter((p) => p.tier?.toLowerCase() === tier);

  const handleRecommendation = (pkg) => {
    setRecommended(pkg);

    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Packages", path: "/packages" },
          { label: "Compare Packages" },
        ]}
      />

      <PageHero
        title="Compare Health Packages"
        subtitle="Find the right package based on tests and pricing"
      />

      <PackageRecommendationQuiz
        packages={packages}
        onRecommendation={handleRecommendation}
      />

      {/* TIER FILTER */}

      <div className="flex justify-center mt-12">
        <div className="flex gap-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-2">
          {["all", "basic", "advanced", "premium"].map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                tier === t
                  ? "bg-[var(--color-primary)] text-white"
                  : "hover:bg-[var(--surface)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div ref={tableRef}>
        <PackagesCompareTable
          packages={filteredPackages}
          recommendedPackage={recommended}
        />
      </div>

      <AppointmentCTA variant="large" className="my-16" />
    </main>
  );
}
