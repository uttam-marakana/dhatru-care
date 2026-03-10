import { useState, useMemo } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function UniversalFilterLayout({
  filters,
  onChange,
  FiltersComponent,
}) {
  const [open, setOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);

  const activeFilters = useMemo(
    () =>
      Object.values(filters || {}).filter((v) => v !== "" && v !== undefined)
        .length,
    [filters],
  );

  return (
    <>
      {/* Desktop */}

      <section className="hidden lg:block sticky top-0 bg-[var(--surface)] border-b border-[var(--border)] z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Filters</h3>

            <button
              onClick={() => setDesktopOpen(!desktopOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            >
              <FaFilter />

              {activeFilters > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {desktopOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <FiltersComponent filters={filters} onChange={onChange} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Mobile Button */}

      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full"
      >
        <FaFilter />
      </button>

      {/* Mobile Drawer */}

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 w-[90%] max-w-[420px] h-full bg-white p-6"
            >
              <div className="flex justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>

                <button onClick={() => setOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <FiltersComponent
                filters={filters}
                onChange={(data) => {
                  onChange(data);
                  setOpen(false);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
