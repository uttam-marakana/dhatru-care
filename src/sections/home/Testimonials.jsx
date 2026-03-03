import { useState, useEffect, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SkeletonCard from "../../components/common/SkeletonCard";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

const fallbackTestimonials = [
  {
    name: "Mrs. Rekha Parmar",
    location: "Gondal",
    text: "The care I received was exceptional. Highly professional team.",
    rating: 5,
  },
  {
    name: "Mr. Jayesh Solanki",
    location: "Jetpur",
    text: "Very professional and compassionate staff.",
    rating: 5,
  },
];

export default function Testimonials({
  testimonials: apiTestimonials = [],
  loading = false,
  error = null,
  carousel = true,
}) {
  const data = apiTestimonials.length ? apiTestimonials : fallbackTestimonials;
  const [index, setIndex] = useState(0);

  const next = () => setIndex((p) => (p === data.length - 1 ? 0 : p + 1));
  const prev = () => setIndex((p) => (p === 0 ? data.length - 1 : p - 1));

  /* Auto rotate */
  useEffect(() => {
    if (!carousel || loading || data.length <= 1) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [carousel, loading, data.length]);

  return (
    <section className="py-14 md:py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our Patients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real stories from people who trusted us with their health.
          </p>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="text-center text-red-600 py-6">
            Failed to load testimonials.
          </div>
        )}

        {/* ================= CAROUSEL ================= */}
        {!loading && !error && carousel && (
          <div className="max-w-3xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  if (offset.x > 100) prev();
                  if (offset.x < -100) next();
                }}
              >
                <Card className="p-8 text-center">
                  <p className="italic text-lg mb-6">"{data[index].text}"</p>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: data[index].rating || 5 }).map(
                      (_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ),
                    )}
                  </div>

                  <p className="font-semibold text-lg">{data[index].name}</p>
                  <p className="text-sm text-gray-500">
                    {data[index].location}
                  </p>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {data.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg p-3 rounded-full"
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={next}
                  className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg p-3 rounded-full"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        )}

        {/* ================= GRID MODE ================= */}
        {!loading && !error && !carousel && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((t, i) => (
              <Card key={i} className="h-full flex flex-col p-6">
                <p className="italic flex-1 mb-4">{t.text}</p>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-sm" />
                  ))}
                </div>

                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline">Read More Reviews →</Button>
        </div>
      </Container>
    </section>
  );
}
