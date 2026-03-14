import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { getPackages } from "../../api/packagesApi";
import LazyWrapper from "../../components/common/LazyWrapper";
import Breadcrumb from "../../components/common/Breadcrumb";

/* Lazy Sections */
const HealthPackages = lazy(() => import("../../sections/home/HealthPackages"));
const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheRef = useRef(null);

  useEffect(() => {
    let active = true;

    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);

        if (cacheRef.current) {
          setPackages(cacheRef.current);
          setLoading(false);
          return;
        }

        const data = await getPackages();

        if (!active) return;

        cacheRef.current = data;
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
  }, []);

  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <main className="min-h-screen bg-[var(--bg)]">
        <Breadcrumb
          items={[{ label: "Home", path: "/" }, { label: "Health Packages" }]}
        />

        <PageHero
          title="Health Packages"
          subtitle="Affordable preventive health checkups & specialized care plans"
        />

        <div className="py-12 md:py-20">
          <HealthPackages
            packages={packages}
            loading={loading}
            error={error}
            fullWidth
          />
        </div>

        <AppointmentCTA className="my-12 md:my-16 lg:my-20" />
      </main>
    </Suspense>
  );
}
