import { useState, useEffect, lazy } from "react";
import { getPackages } from "../api/packagesApi";
import LazyWrapper from "../components/common/LazyWrapper";

const HealthPackages = lazy(() => import("../sections/home/HealthPackages"));
const PageHero = lazy(() => import("../sections/shared/PageHero"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));
const Breadcrumb = lazy(() => import("../components/common/Breadcrumb"));

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ------------ FETCH PACKAGES ---------------------------------------------- */
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
        if (mounted) setError("Failed to load packages.");
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
        items={[{ label: "Home", path: "/" }, { label: "Health Packages" }]}
      />

      <PageHero
        title="Health Packages"
        subtitle="Affordable preventive health checkups & specialized care plans"
      />

      <div className="py-12 md:py-20">
        <LazyWrapper>
          <HealthPackages
            packages={packages}
            loading={loading}
            error={error}
            fullWidth
          />
        </LazyWrapper>
      </div>

      <AppointmentCTA className="my-12 md:my-16 lg:my-20" />
    </main>
  );
}
