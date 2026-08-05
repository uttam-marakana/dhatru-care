import { useState, useEffect, useRef, lazy, Suspense, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getPackages } from "../../api/packagesApi";
import Breadcrumb from "../../components/common/Breadcrumb";

import UniversalFilterLayout from "../../components/filters/UniversalFilterLayout";

const HealthPackages = lazy(() => import("../../sections/home/HealthPackages"));
const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const PackageFilters = lazy(
  () => import("../../sections/packages/PackageFilters"),
);
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    priceRange: searchParams.get("priceRange") || "",
  });

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

  /* --- Sync filters → URL ----------- */

  useEffect(() => {
    const params = {};

    Object.entries(filters).forEach(([k, v]) => {
      if (v) params[k] = v;
    });

    setSearchParams(params);
  }, [filters, setSearchParams]);

  /* --- Apply filters ----------- */

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
    return 0;
  };

  const filteredPackages = useMemo(() => {
    let data = [...packages];

    if (filters.search) {
      const term = filters.search.toLowerCase();

      data = data.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term),
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange
        .split("-")
        .map((v) => (v ? Number(v) : Infinity));

      data = data.filter((p) => {
        const price = parsePrice(p.price);
        return price >= min && price <= max;
      });
    }

    return data;
  }, [filters, packages]);

  const clearFilters = () => {
    setFilters({ search: "", priceRange: "" });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v);

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

        <UniversalFilterLayout
          filters={filters}
          onChange={setFilters}
          FiltersComponent={PackageFilters}
        />

        {hasActiveFilters && (
          <div className="max-w-7xl mx-auto px-4 mt-6">
            <button
              onClick={clearFilters}
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {!loading && filteredPackages.length === 0 ? (
          <div className="text-center py-24 text-[var(--text-secondary)]">
            No packages match your filters.
          </div>
        ) : (
          <HealthPackages packages={filteredPackages} loading={loading} />
        )}

        <AppointmentCTA className="my-20" />
      </main>
    </Suspense>
  );
}
