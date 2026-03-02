import { useState, useEffect, lazy, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getBlogPosts } from "../api/blogsApi";
import { FaFilter, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const PageHero = lazy(() => import("../sections/shared/PageHero"));
const BlogFilters = lazy(() => import("../sections/blog/BlogFilters"));
const LatestBlog = lazy(() => import("../sections/home/LatestBlog"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));
const Breadcrumb = lazy(() => import("../components/common/Breadcrumb"));

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ===============================
     FILTER STATE
  ================================= */
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    sortBy: searchParams.get("sortBy") || "latest",
  });

  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* MOBILE DRAWER */
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount = useMemo(
    () => Object.values(filters).filter((v) => v && v !== "latest").length,
    [filters],
  );

  /* ===============================
     FETCH ONCE
  ================================= */
  useEffect(() => {
    let mounted = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();

        if (!mounted) return;

        setAllPosts(data);
        setPosts(data);
      } catch {
        if (mounted) setError("Failed to load blogs");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBlogs();

    return () => (mounted = false);
  }, []);

  /* ===============================
     URL SYNC
  ================================= */
  useEffect(() => {
    const params = {};

    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.sortBy !== "latest") params.sortBy = filters.sortBy;

    setSearchParams(params);
  }, [filters]);

  /* ===============================
     LOCAL FILTERING
  ================================= */
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
      data = data.filter((p) => p.category === filters.category);
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Blog" }]} />

      <PageHero
        title="Health Blog & News"
        subtitle="Latest medical insights and wellness updates"
      />

      {/* DESKTOP FILTERS */}
      <section className="hidden lg:block sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <BlogFilters filters={filters} onFilterChange={setFilters} />
        </div>
      </section>

      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="relative bg-primary text-white p-4 rounded-full shadow-lg"
        >
          <FaFilter />

          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-50">
            {/* overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
            />

            {/* drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 h-full w-[88%] sm:w-105 bg-white dark:bg-gray-900 p-5 overflow-y-auto"
            >
              <div className="flex justify-between mb-6">
                <h3 className="text-xl font-bold">Filters</h3>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FaTimes />
                </button>
              </div>

              <BlogFilters filters={filters} onFilterChange={setFilters} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BLOG LIST */}
      <LatestBlog posts={posts} loading={loading} error={error} fullBlogPage />

      <AppointmentCTA className="my-16" />
    </main>
  );
}
