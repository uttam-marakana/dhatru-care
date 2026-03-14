import { useState, useEffect, lazy } from "react";
import { useLocation } from "react-router-dom";
import { getPackages } from "../../api/packagesApi";
import LazyWrapper from "../../components/common/LazyWrapper";

const HealthPackages = lazy(() => import("../../sections/home/HealthPackages"));
const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

import Breadcrumb from "../../components/common/Breadcrumb";

export default function Packages() {
  const location = useLocation();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPackages();

        if (!active) return;

        setPackages(data || []);
      } catch (err) {
        console.error(err);

        if (active) setError("Failed to load packages.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPackages();

    return () => {
      active = false;
    };
  }, [location.pathname]); // important change

  return (
    <main className="min-h-screen bg-[var(--bg)]">
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
