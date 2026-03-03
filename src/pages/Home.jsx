import { lazy, useEffect, useState } from "react";
import LazyWrapper from "../components/common/LazyWrapper";
import { useInView } from "../hooks/useInView";

/* EAGER */
import Hero from "../sections/home/Hero";
import QuickActions from "../sections/home/QuickActions";
import AboutHospital from "../sections/home/AboutHospital";

/* LAZY */
const Facilities = lazy(() => import("../sections/home/Facilities"));
const FeaturedDepartments = lazy(
  () => import("../sections/home/FeaturedDepartments"),
);
const FeaturedDoctors = lazy(() => import("../sections/home/FeaturedDoctors"));
const HealthPackages = lazy(() => import("../sections/home/HealthPackages"));
const Testimonials = lazy(() => import("../sections/home/Testimonials"));
const LatestBlog = lazy(() => import("../sections/home/LatestBlog"));
const ContactMap = lazy(() => import("../sections/home/ContactMap"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));
const Newsletter = lazy(() => import("../sections/shared/Newsletter"));

/* APIs */
import { getDoctors } from "../api/doctorsApi";
import { getAllDepartments } from "../api/departmentsApi";
import { getPackages } from "../api/packagesApi";
import { getBlogPosts } from "../api/blogsApi";

/* SECTION WRAPPER */
function SectionWrapper({ children }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`transition-opacity duration-700 ${
        isInView ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </section>
  );
}

export default function Home() {
  const [showTop, setShowTop] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [packages, setPackagesData] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  /* FETCH ALL HOME DATA */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [dept, docs, pkgs, posts] = await Promise.all([
          getAllDepartments(),
          getDoctors(),
          getPackages(),
          getBlogPosts(),
        ]);

        setDepartments(dept);
        setDoctors(docs);
        setPackagesData(pkgs);
        setBlogs(posts);
      } catch (err) {
        console.error("HOME DATA FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* BACK TO TOP */
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen overflow-x-hidden">
      <Hero />

      <SectionWrapper>
        <QuickActions />
      </SectionWrapper>

      <SectionWrapper>
        <AboutHospital />
      </SectionWrapper>

      <LazyWrapper>
        <SectionWrapper>
          <Facilities facilities={departments.slice(0, 4)} loading={loading} />
        </SectionWrapper>

        <SectionWrapper>
          <FeaturedDepartments departments={departments} loading={loading} />
        </SectionWrapper>

        <SectionWrapper>
          <FeaturedDoctors doctors={doctors} loading={loading} />
        </SectionWrapper>

        <SectionWrapper>
          <HealthPackages packages={packages} loading={loading} />
        </SectionWrapper>

        <SectionWrapper>
          <Testimonials />
        </SectionWrapper>

        <SectionWrapper>
          <LatestBlog posts={blogs} loading={loading} />
        </SectionWrapper>

        <SectionWrapper>
          <AppointmentCTA variant="large" />
        </SectionWrapper>

        <SectionWrapper>
          <ContactMap />
        </SectionWrapper>

        <SectionWrapper>
          <Newsletter />
        </SectionWrapper>
      </LazyWrapper>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg transition ${
          showTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        ↑
      </button>
    </main>
  );
}
