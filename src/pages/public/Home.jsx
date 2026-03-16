import { lazy, useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import HeroSlider from "../../sections/home/HeroSlider";
import QuickActions from "../../sections/home/QuickActions";
import AboutHospital from "../../sections/home/AboutHospital";

const Facilities = lazy(() => import("../../sections/home/Facilities"));
const FeaturedDepartments = lazy(
  () => import("../../sections/home/FeaturedDepartments"),
);
const FeaturedDoctors = lazy(
  () => import("../../sections/home/FeaturedDoctors"),
);
const HealthPackages = lazy(() => import("../../sections/home/HealthPackages"));
const Testimonials = lazy(() => import("../../sections/home/Testimonials"));
const LatestBlog = lazy(() => import("../../sections/home/LatestBlog"));
const ContactMap = lazy(() => import("../../sections/home/ContactMap"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);
const Newsletter = lazy(() => import("../../sections/shared/Newsletter"));

import { getDoctors } from "../../api/doctorsApi";
import { getAllDepartments } from "../../api/departmentsApi";
import { getPackages } from "../../api/packagesApi";
import { getBlogPosts } from "../../api/blogsApi";

export default function Home() {
  const { role, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    departments: [],
    doctors: [],
    packages: [],
    blogs: [],
  });

  const [loading, setLoading] = useState(true);

  /* REDIRECT ADMIN TO DASHBOARD */

  useEffect(() => {
    if (!authLoading && role === "admin") {
      navigate("/admin");
    }
  }, [role, authLoading, navigate]);

  /* LOAD HOME DATA */

  useEffect(() => {
    const load = async () => {
      try {
        const [dept, docs, pkgs, posts] = await Promise.all([
          getAllDepartments(),
          getDoctors(),
          getPackages(),
          getBlogPosts(),
        ]);

        setData({
          departments: dept,
          doctors: docs,
          packages: pkgs,
          blogs: posts,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <HeroSlider />
      <QuickActions />
      <AboutHospital />

      <Suspense fallback={null}>
        <Facilities
          facilities={data.departments.slice(0, 4)}
          loading={loading}
        />

        <FeaturedDepartments departments={data.departments} loading={loading} />

        <FeaturedDoctors doctors={data.doctors} loading={loading} />

        <HealthPackages packages={data.packages} loading={loading} />

        <Testimonials />

        <LatestBlog posts={data.blogs} loading={loading} />

        <AppointmentCTA variant="large" />

        <ContactMap />

        <Newsletter />
      </Suspense>
    </main>
  );
}
