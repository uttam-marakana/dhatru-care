import { useEffect, useState, lazy, useRef } from "react";
import { getPackages } from "../api/packagesApi";

const PageHero = lazy(() => import("../sections/shared/PageHero"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));
const Breadcrumb = lazy(() => import("../components/common/Breadcrumb"));

const PackagesCompareTable = lazy(
  () => import("../sections/packages/PackagesCompareTable"),
);

const PackageRecommendationQuiz = lazy(
  () => import("../sections/packages/PackageRecommendationQuiz"),
);

export default function PackagesCompare() {
  const [packages, setPackages] = useState([]);
  const [recommended, setRecommended] = useState(null);

  const [tier, setTier] = useState("all");

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackages();
      setPackages(data);
    };

    fetchPackages();
  }, []);

  const handleRecommendation = (pkg) => {
    setRecommended(pkg);

    setTimeout(() => {
      tableRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  };

  /* -------- PACKAGE TIER FILTER -------- */

  const filteredPackages =
    tier === "all"
      ? packages
      : packages.filter((p) => p.tier?.toLowerCase() === tier);

  return (
    <main className="min-h-screen bg-(--bg)">
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Packages", path: "/packages" },
          { label: "Compare Packages" },
        ]}
      />

      <PageHero
        title="Compare Health Packages"
        subtitle="Find the right package based on tests, benefits and pricing"
      />

      <PackageRecommendationQuiz
        packages={packages}
        onRecommendation={handleRecommendation}
      />

      {/* TIER TOGGLE */}

      <div className="flex justify-center mt-10">
        <div className="flex gap-2 bg-(--card) border border-(--border) rounded-xl p-2">
          {["all", "basic", "advanced", "premium"].map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                tier === t
                  ? "bg-(--color-primary) text-white"
                  : "hover:bg-(--surface)"
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
