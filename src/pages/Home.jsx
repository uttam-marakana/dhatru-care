import { lazy } from "react";
import LazyWrapper from "../components/common/LazyWrapper";
import { useInView } from "../hooks/useInView";

// Eagerly loaded
import Hero from "../sections/home/Hero";
import QuickActions from "../sections/home/QuickActions";
import AboutHospital from "../sections/home/AboutHospital";

// Lazy loaded
const Facilities = lazy(() => import("../sections/home/Facilities"));
const FeaturedDepartments = lazy(
  () => import("../sections/home/FeaturedDepartments"),
);
const FeaturedDoctors = lazy(() => import("../sections/home/FeaturedDoctors"));
const HealthPackages = lazy(() => import("../sections/home/HealthPackages"));
const Testimonials = lazy(() => import("../sections/home/Testimonials"));
const LatestBlog = lazy(() => import("../sections/home/LatestBlog"));
const ContactMap = lazy(() => import("../sections/home/ContactMap"));

// Shared
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));
const Newsletter = lazy(() => import("../sections/shared/Newsletter"));

function SectionWrapper({ children }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`animate-section ${isInView ? "visible" : ""}`}
    >
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero – always visible first */}
      <Hero />

      {/* Quick actions – high priority */}
      <SectionWrapper>
        <QuickActions />
      </SectionWrapper>

      {/* About – trust builder */}
      <SectionWrapper>
        <div className="py-12 md:py-20 lg:py-24">
          <AboutHospital />
        </div>
      </SectionWrapper>

      {/* Lazy + animated sections below fold */}
      <LazyWrapper>
        <SectionWrapper>
          <Facilities />
        </SectionWrapper>

        <SectionWrapper>
          <div className="py-12 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
            <FeaturedDepartments />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <FeaturedDoctors />
        </SectionWrapper>

        <SectionWrapper>
          <div className="py-12 md:py-20 lg:py-24">
            <HealthPackages />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="py-12 md:py-20 lg:py-24 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
            <Testimonials />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <LatestBlog />
        </SectionWrapper>

        <SectionWrapper>
          <AppointmentCTA
            variant="large"
            className="my-12 md:my-16 lg:my-20 mx-4 md:mx-8 lg:mx-auto max-w-6xl rounded-3xl"
          />
        </SectionWrapper>

        <SectionWrapper>
          <ContactMap />
        </SectionWrapper>

        <SectionWrapper>
          <Newsletter />
        </SectionWrapper>
      </LazyWrapper>

      {/* Optional: Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all opacity-0 invisible data-[visible=true]:opacity-100 data-[visible=true]:visible"
        data-visible={window.scrollY > 600 ? "true" : "false"}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
