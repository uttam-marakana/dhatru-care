import { lazy } from "react";

// Dynamic imports for code splitting
const Container = lazy(() => import("../../components/layout/Container"));

export default function AboutHospital() {
  return (
    <Container>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to <span className="text-primary">Dhatru Care</span>
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Dhatru Care Multispeciality Hospital is committed to delivering
            world-class healthcare with compassion, innovation, and excellence.
            Located in the heart of Gondal, we combine cutting-edge medical
            technology with a human touch.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Our team of highly qualified doctors, nurses, and support staff work
            24×7 to ensure every patient receives personalized care of the
            highest standard.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
          {/* Replace with real hospital / team photo */}
          <div className="aspect-4/3 bg-linear-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-6xl text-white/40">
            Hospital Image
          </div>
        </div>
      </div>
    </Container>
  );
}
