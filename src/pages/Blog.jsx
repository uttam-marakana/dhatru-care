// src/pages/Blog.jsx
import { useState, useEffect } from "react";
import PageHero from "../sections/shared/PageHero";
import BlogFilters from "../sections/blog/BlogFilters";
import LatestBlog from "../sections/home/LatestBlog"; // reuse or create new
import AppointmentCTA from "../sections/shared/AppointmentCTA";

export default function Blog() {
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageHero
        title="Health Blog & News"
        subtitle="Latest medical insights, wellness tips, patient stories and hospital updates"
      />

      <BlogFilters onFilterChange={setFilters} />

      <div className="py-12 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-950/50">
        {isLoading ? (
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800" />
                  <div className="p-6 space-y-4">
                    <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <LatestBlog filters={filters} />
        )}
      </div>

      <AppointmentCTA variant="large" className="my-12 md:my-16 lg:my-20" />
    </>
  );
}
