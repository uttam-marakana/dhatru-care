import PageHero from "../sections/shared/PageHero";
import AppointmentCTA from "../sections/shared/AppointmentCTA";

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive healthcare solutions under one roof"
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Grid or accordion of services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service cards */}
          </div>
        </div>
      </div>

      <AppointmentCTA />
    </>
  );
}
