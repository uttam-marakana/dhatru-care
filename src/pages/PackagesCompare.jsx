import { useEffect, useState, lazy } from "react";
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ===============================
     FETCH PACKAGES
  ================================= */
  useEffect(() => {
    let mounted = true;

    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPackages();

        if (!mounted) return;
        setPackages(data);
      } catch (err) {
        console.error(err);
        if (mounted) {
          setError("Failed to load packages.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPackages();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
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

      {/* SMART QUIZ */}
      <PackageRecommendationQuiz
        packages={packages}
        onRecommendation={setRecommended}
      />

      {/* COMPARE TABLE */}
      <PackagesCompareTable
        packages={packages}
        loading={loading}
        error={error}
        recommendedPackage={recommended}
      />

      <AppointmentCTA variant="large" className="my-12 md:my-16 lg:my-20" />
    </main>
  );
}
