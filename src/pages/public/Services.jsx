import { lazy } from "react";

const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

export default function Services() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <PageHero
        title="Our Services"
        subtitle="Comprehensive healthcare solutions under one roof"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Service Card */}
            <div
              className="
          p-6 rounded-2xl
          bg-[var(--card)]
          border border-[var(--border)]
          hover:border-[var(--color-primary)]/40
          hover:shadow-[0_0_30px_var(--glow-soft)
          transition
          "
            >
              <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                Emergency Care
              </h3>

              <p className="text-[var(--text-secondary)]">
                24×7 emergency support with advanced trauma and ICU facilities.
              </p>
            </div>

            <div
              className="
          p-6 rounded-2xl
          bg-[var(--card)]
          border border-[var(--border)]
          hover:border-[var(--color-primary)]/40
          hover:shadow-[0_0_30px_var(--glow-soft)
          transition
          "
            >
              <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                Diagnostic Services
              </h3>

              <p className="text-[var(--text-secondary)]">
                Advanced lab testing and imaging with accurate reporting.
              </p>
            </div>

            <div
              className="
          p-6 rounded-2xl
          bg-[var(--card)]
          border border-[var(--border)]
          hover:border-[var(--color-primary)]/40
          hover:shadow-[0_0_30px_var(--glow-soft)
          transition
          "
            >
              <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                Preventive Health
              </h3>

              <p className="text-[var(--text-secondary)]">
                Comprehensive health checkups designed for early detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </main>
  );
}
