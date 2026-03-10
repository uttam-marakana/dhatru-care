import { lazy, Suspense } from "react";

const TopBar = lazy(() => import("../components/layout/TopBar"));
const Header = lazy(() => import("../components/layout/Header"));
const Footer = lazy(() => import("../components/layout/Footer"));

import AnimatedOutlet from "../components/common/AnimatedOutlet";
import FloatingAppointmentButton from "../components/common/FloatingAppointmentButton";

export default function PublicLayout() {
  return (
    <div
      className="
      flex min-h-screen flex-col
      overflow-x-hidden
      
      bg-gradient-to-b
      from-gray-50 via-gray-100 to-gray-50
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
      
      text-gray-900
      dark:text-white
      "
    >
      {/* Top navigation */}
      <Suspense fallback={null}>
        <TopBar />
        <Header />
      </Suspense>

      {/* Page content */}
      <main className="grow relative">
        <AnimatedOutlet />

        {/* Floating CTA */}
        <FloatingAppointmentButton />
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
