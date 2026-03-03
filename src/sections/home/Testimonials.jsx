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

  const [[index, direction], setIndex] = useState([0, 0]);

  const next = () =>
    setIndex(([prev]) => [prev === data.length - 1 ? 0 : prev + 1, 1]);

  const prev = () =>
    setIndex(([prev]) => [prev === 0 ? data.length - 1 : prev - 1, -1]);

  /* Auto rotate (resets after interaction) */
  useEffect(() => {
    if (!carousel || loading || data.length <= 1) return;

    const interval = setInterval(() => {
      next();
    }, 6000);

    return () => clearInterval(interval);
  }, [carousel, loading, data.length, index]);

  return (
    <section className="py-14 md:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Container>
        {/* HEADER */}
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our Patients Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real stories from people who trusted us with their health.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-center text-red-600 py-6">
            Failed to load testimonials.
          </div>
        )}

        {/* CAROUSEL */}
        {!loading && !error && carousel && (
          <div className="relative max-w-3xl mx-auto px-4">
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  dragMomentum
                  whileDrag={{ scale: 0.98 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipePower = Math.abs(offset.x) * velocity.x;

                    if (offset.x > 80 || swipePower > 8000) prev();
                    if (offset.x < -80 || swipePower < -8000) next();
                  }}
                >
                  <Card className="p-6 sm:p-8 text-center">
                    <p className="italic text-base sm:text-lg mb-6 leading-relaxed">
                      "{data[index].text}"
                    </p>

                    <div className="flex justify-center gap-1 mb-4 flex-nowrap">
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

              {/* Navigation Buttons - Always Visible */}
              {data.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg p-3 rounded-full"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg p-3 rounded-full"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* GRID MODE */}
        {!loading && !error && !carousel && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {data.map((t, i) => (
              <Card key={i} className="h-full flex flex-col p-6">
                <p className="italic flex-1 mb-4 leading-relaxed">{t.text}</p>

                <div className="flex gap-1 mb-3 flex-nowrap">
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

        <div className="text-center mt-12 px-4">
          <Button variant="outline">Read More Reviews →</Button>
        </div>
      </Container>
    </section>
  );
}
