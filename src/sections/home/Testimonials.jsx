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

  useEffect(() => {
    if (!carousel || loading || data.length <= 1) return;
    const interval = setInterval(() => next(), 6000);
    return () => clearInterval(interval);
  }, [carousel, loading, data.length, index]);

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Blue Glow Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16 relative z-10 px-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            What Our Patients Say
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Real stories from people who trusted us with their health.
          </p>

          {/* Rating Authority */}
          <div className="flex items-center justify-center gap-3 mt-6 text-gray-300">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className="text-blue-400" />
              ))}
            </div>
            <span className="font-medium text-blue-400">
              4.9/5 Average Rating
            </span>
            <span className="text-sm text-gray-500">(2,000+ Reviews)</span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center text-red-500 py-6">
            Failed to load testimonials.
          </div>
        )}

        {/* Carousel Mode */}
        {!loading && !error && carousel && (
          <div className="relative max-w-3xl mx-auto px-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
              >
                <div className="relative p-10 text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-blue-400/20">
                    “
                  </div>

                  <p className="italic text-lg md:text-xl mb-8 leading-relaxed text-gray-300">
                    {data[index].text}
                  </p>

                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: data[index].rating || 5 }).map(
                      (_, i) => (
                        <FaStar key={i} className="text-blue-400 text-lg" />
                      ),
                    )}
                  </div>

                  <p className="font-semibold text-lg">{data[index].name}</p>
                  <p className="text-sm text-gray-500">
                    {data[index].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {data.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/5 border border-white/10 backdrop-blur-md hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] p-3 rounded-full transition"
                >
                  <FaChevronLeft className="text-blue-400" />
                </button>

                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/5 border border-white/10 backdrop-blur-md hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] p-3 rounded-full transition"
                >
                  <FaChevronRight className="text-blue-400" />
                </button>
              </>
            )}
          </div>
        )}

        <div className="text-center mt-14 relative z-10">
          <Button variant="ghost" className="text-blue-400 hover:text-white">
            Read More Reviews →
          </Button>
        </div>
      </Container>
    </section>
  );
}
