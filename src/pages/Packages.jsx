import HealthPackages from "../sections/home/HealthPackages"; // reuse or make new full version
import PageHero from "../sections/shared/PageHero";
import AppointmentCTA from "../sections/shared/AppointmentCTA";

export default function Packages() {
  return (
    <>
      <PageHero
        title="Health Packages"
        subtitle="Affordable preventive health checkups & specialized care plans"
      />

      <div className="py-16 md:py-24">
        <HealthPackages fullWidth={true} />
      </div>

      <AppointmentCTA />
    </>
  );
}
