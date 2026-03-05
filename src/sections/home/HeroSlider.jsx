import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Advanced Multispeciality Care",
    subtitle:
      "Modern infrastructure combined with compassionate, patient-first treatment.",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600",
  },
  {
    title: "Expert Doctors You Can Trust",
    subtitle:
      "Highly experienced specialists delivering precision diagnosis and care.",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1600",
  },
  {
    title: "24×7 Emergency Services",
    subtitle: "Immediate response and critical care when every second matters.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600",
  },
];

export default function HeroSlider() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const next = () =>
    setIndex(([prev]) => [prev === slides.length - 1 ? 0 : prev + 1, 1]);

  const prev = () =>
    setIndex(([prev]) => [prev === 0 ? slides.length - 1 : prev - 1, -1]);

  useEffect(() => {
    const interval = setInterval(() => next(), 6000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={slides[index].image}
          src={slides[index].image}
          alt=""
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-(--bg)/80 z-10" />

      <Container className="relative z-20 h-full flex items-center">
        <motion.div
          key={slides[index].title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-(--text) max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            {slides[index].title}
          </h1>

          <p className="text-lg md:text-xl text-(--text-secondary) mb-10">
            {slides[index].subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/appointment">
              <Button size="lg">Book Appointment</Button>
            </Link>

            <Link to="/departments">
              <Button variant="outline" size="lg">
                Explore Departments
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-(--card) border border-(--border)"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-(--card) border border-(--border)"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}
