import { useState, useEffect, lazy } from "react";
import { useSearchParams } from "react-router-dom";
import { getBlogPosts } from "../../api/blogsApi";

import UniversalFilterLayout from "../../components/filters/UniversalFilterLayout";

const PageHero = lazy(() => import("../../sections/shared/PageHero"));
const BlogFilters = lazy(() => import("../../sections/blog/BlogFilters"));
const LatestBlog = lazy(() => import("../../sections/home/LatestBlog"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);
import Breadcrumb from "../../components/layout/Breadcrumb";

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    sortBy: searchParams.get("sortBy") || "latest",
  });

  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getBlogPosts();

        if (!mounted) return;

        setAllPosts(data);
        setPosts(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load blogs.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPosts();

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    const params = {};

    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.sortBy !== "latest") params.sortBy = filters.sortBy;

    setSearchParams(params);
  }, [filters, setSearchParams]);

  useEffect(() => {
    let data = [...allPosts];

    if (filters.search) {
      const term = filters.search.toLowerCase();

      data = data.filter(
        (p) =>
          p.title?.toLowerCase().includes(term) ||
          p.excerpt?.toLowerCase().includes(term),
      );
    }

    if (filters.category) {
      data = data.filter(
        (p) => p.category?.toLowerCase() === filters.category.toLowerCase(),
      );
    }

    if (filters.sortBy === "latest") {
      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );
    }

    if (filters.sortBy === "oldest") {
      data.sort(
        (a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0),
      );
    }

    setPosts(data);
  }, [filters, allPosts]);

  return (
    <main
      className="
      min-h-screen
      bg-[var(--bg)]
      "
    >
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Blog" }]} />

      <PageHero
        title="Health Blog & News"
        subtitle="Latest medical insights and wellness updates"
      />

      <UniversalFilterLayout
        filters={filters}
        onChange={setFilters}
        FiltersComponent={BlogFilters}
      />

      <LatestBlog posts={posts} loading={loading} error={error} fullBlogPage />

      <AppointmentCTA variant="large" className="my-12 md:my-16 lg:my-20" />
    </main>
  );
}
