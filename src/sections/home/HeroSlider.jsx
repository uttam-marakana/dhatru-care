import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";

const slides = [
  {
    title: "Advanced Multispeciality Care",
    subtitle: "Modern infrastructure with compassionate treatment",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600",
  },
  {
    title: "Expert Doctors You Can Trust",
    subtitle: "Highly experienced specialists across disciplines",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1600",
  },
  {
    title: "24×7 Emergency Services",
    subtitle: "Immediate response when you need it most",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((p) => (p === slides.length - 1 ? 0 : p + 1));

  const prev = () => setIndex((p) => (p === 0 ? slides.length - 1 : p - 1));

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[75vh] md:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index].image}
          src={slides[index].image}
          alt=""
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/55" />

      <Container className="relative z-10 h-full flex items-center">
        <motion.div
          key={slides[index].title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {slides[index].title}
          </h1>
          <p className="text-lg md:text-xl mb-8">{slides[index].subtitle}</p>
          <Button size="lg">Book Appointment</Button>
        </motion.div>
      </Container>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-3 rounded-full text-white"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-3 rounded-full text-white"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}
