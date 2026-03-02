import { lazy, useEffect, useState } from "react";
import LazyWrapper from "../components/common/LazyWrapper";
import { useInView } from "../hooks/useInView";

/* ===============================
   EAGER SECTIONS
================================= */
import Hero from "../sections/home/Hero";
import QuickActions from "../sections/home/QuickActions";
import AboutHospital from "../sections/home/AboutHospital";

/* ===============================
   LAZY SECTIONS
================================= */
const Facilities = lazy(() => import("../sections/home/Facilities"));
const FeaturedDepartments = lazy(
  () => import("../sections/home/FeaturedDepartments"),
);
const FeaturedDoctors = lazy(() => import("../sections/home/FeaturedDoctors"));
const HealthPackages = lazy(() => import("../sections/home/HealthPackages"));
const Testimonials = lazy(() => import("../sections/home/Testimonials"));
const LatestBlog = lazy(() => import("../sections/home/LatestBlog"));
const ContactMap = lazy(() => import("../sections/home/ContactMap"));

/* ===============================
   SHARED
================================= */
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));
const Newsletter = lazy(() => import("../sections/shared/Newsletter"));

/* ===============================
   SECTION WRAPPER
================================= */
function SectionWrapper({ children }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`
        animate-section
        transition-opacity duration-700
        will-change-transform
        ${isInView ? "visible" : ""}
      `}
    >
      {children}
    </section>
  );
}

/* ===============================
   HOME PAGE
================================= */
export default function Home() {
  const [showTop, setShowTop] = useState(false);

  /* BACK TO TOP VISIBILITY */
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen overflow-x-hidden">
      {/* HERO */}
      <Hero />

      {/* QUICK ACTIONS */}
      <SectionWrapper>
        <QuickActions />
      </SectionWrapper>

      {/* ABOUT */}
      <SectionWrapper>
        <div className="py-12 md:py-16 lg:py-20">
          <AboutHospital />
        </div>
      </SectionWrapper>

      {/* BELOW FOLD */}
      <LazyWrapper>
        <SectionWrapper>
          <div className="py-12 md:py-16 lg:py-20">
            <Facilities />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50">
            <FeaturedDepartments />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="py-12 md:py-16 lg:py-20">
            <FeaturedDoctors />
          </div>
        </SectionWrapper>

        {/* NO EXTRA PADDING INSIDE COMPONENT */}
        <SectionWrapper>
          <HealthPackages />
        </SectionWrapper>

        <SectionWrapper>
          <div className="py-12 md:py-16 lg:py-20 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
            <Testimonials />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <LatestBlog />
        </SectionWrapper>

        <SectionWrapper>
          <AppointmentCTA
            variant="large"
            className="my-12 md:my-16 lg:my-20 mx-4 sm:mx-6 lg:mx-auto max-w-6xl rounded-3xl"
          />
        </SectionWrapper>

        <SectionWrapper>
          <ContactMap />
        </SectionWrapper>

        <SectionWrapper>
          <Newsletter />
        </SectionWrapper>
      </LazyWrapper>

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`
          fixed bottom-5 right-5 sm:bottom-6 sm:right-6
          z-50 bg-primary text-white
          p-3 sm:p-4 rounded-full shadow-lg
          hover:bg-primary-dark transition-all duration-300
          ${showTop ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        aria-label="Back to top"
      >
        ↑
      </button>
    </main>
  );
}
