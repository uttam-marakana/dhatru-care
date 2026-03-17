import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { getPackages } from "../../api/packagesApi";
import Breadcrumb from "../../components/common/Breadcrumb";

const HealthPackages = lazy(() => import("../../sections/home/HealthPackages"));
const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const cacheRef = useRef(null);

  useEffect(() => {
    const fetchPackages = async () => {
      if (cacheRef.current) {
        setPackages(cacheRef.current);
        setLoading(false);
        return;
      }

      const data = await getPackages();

      cacheRef.current = data;

      setPackages(data || []);
      setLoading(false);
    };

    fetchPackages();
  }, []);

  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <main className="min-h-screen bg-[var(--bg)]">
        <Breadcrumb
          items={[{ label: "Home", path: "/" }, { label: "Health Packages" }]}
        />

        <PageHero
          title="Health Packages"
          subtitle="Affordable preventive health checkups"
        />

        <HealthPackages packages={packages} loading={loading} fullWidth />

        <AppointmentCTA className="my-20" />
      </main>
    </Suspense>
  );
}
