import { useState, useMemo, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function UniversalFilterLayout({
  filters,
  onChange,
  FiltersComponent,
}) {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [desktopOpen, setDesktopOpen] = useState(false); // desktop collapsed by default

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const activeFiltersCount = useMemo(
    () => Object.values(filters || {}).filter(Boolean).length,
    [filters],
  );

  const handleChange = (data) => {
    onChange(data); // keep filtering logic intact
  };

  return (
    <>
      {/* DESKTOP */}
      <section className="hidden lg:block sticky top-0 z-30 bg-gray-900/60 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Desktop Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold">Filters</h3>

            <button
              onClick={() => setDesktopOpen((prev) => !prev)}
              className="relative flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition"
            >
              <FaFilter />
              <span>Filter</span>

              {activeFiltersCount > 0 && (
                <span className="ml-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Collapsible Panel */}
          <AnimatePresence>
            {desktopOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-5"
              >
                <FiltersComponent filters={filters} onChange={handleChange} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* MOBILE FLOAT BUTTON */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-500/30"
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
        {isOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute right-0 top-0 h-full w-[88%] sm:w-[420px] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-l border-white/10 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Filters</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-300"
                >
                  <FaTimes />
                </button>
              </div>

              <FiltersComponent
                filters={filters}
                onChange={(data) => {
                  onChange(data);
                  setIsOpen(false); // auto close mobile
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
