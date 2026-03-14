import { lazy, Suspense } from "react";

const TopBar = lazy(() => import("../components/layout/TopBar"));
const Header = lazy(() => import("../components/layout/Header"));
const Footer = lazy(() => import("../components/layout/Footer"));

import ScrollToTop from "../components/common/ScrollToTop";
import AnimatedOutlet from "../components/common/AnimatedOutlet";
import FloatingAppointmentButton from "../components/common/FloatingAppointmentButton";

import useScrollDirection from "../hooks/useScrollDirection";
import useRoutePrefetch from "../hooks/useRoutePrefetch";

export default function PublicLayout() {
  const scrollDirection = useScrollDirection();

  // Initialize route prefetching (runs once on mount)
  useRoutePrefetch();

  return (
    <div
      className="
      flex min-h-screen flex-col
      overflow-x-hidden
      
      bg-gradient-to-b
      from-gray-50 via-gray-100 to-gray-50
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
      
      text-gray-900 dark:text-white
      "
    >
      <Suspense fallback={null}>
        <ScrollToTop />

        {/* Navigation Wrapper */}
        <div className="relative z-40">
          {/* TopBar hides on scroll down */}
          <div
            className={`
              transition-all duration-300
              ${
                scrollDirection === "down"
                  ? "-translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              }
            `}
          >
            <TopBar />
          </div>

          <Header />
        </div>

        {/* Page content */}
        <main className="grow relative">
          <AnimatedOutlet />
          <FloatingAppointmentButton />
        </main>

        <Footer />
      </Suspense>
    </div>
  );
}
