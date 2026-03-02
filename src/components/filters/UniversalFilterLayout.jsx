import { useState, useMemo } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function UniversalFilterLayout({
  filters,
  onChange,
  FiltersComponent,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount = useMemo(
    () =>
      Object.values(filters || {}).filter((v) => v && v !== "latest").length,
    [filters],
  );

  return (
    <>
      {/* DESKTOP FILTERS */}
      <section className="hidden lg:block sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <FiltersComponent filters={filters} onFilterChange={onChange} />
        </div>
      </section>

      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
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

      {/* DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* OVERLAY */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute right-0 top-0 h-full w-[88%] sm:w-[420px] bg-white dark:bg-gray-900 p-5 overflow-y-auto shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Filters</h3>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FaTimes />
                </button>
              </div>

              <FiltersComponent filters={filters} onFilterChange={onChange} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
