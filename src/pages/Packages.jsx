import { lazy } from "react";
import LazyWrapper from "../components/common/LazyWrapper";

const HealthPackages = lazy(() => import("../sections/home/HealthPackages"));
const PageHero = lazy(() => import("../sections/shared/PageHero"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));

export default function Packages() {
  return (
    <>
      <PageHero
        title="Health Packages"
        subtitle="Affordable preventive health checkups & specialized care plans"
      />

      <div className="py-16 md:py-24">
        <LazyWrapper>
          <HealthPackages fullWidth={true} />
        </LazyWrapper>
      </div>

      <AppointmentCTA />
    </>
  );
}
