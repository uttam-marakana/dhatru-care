import { lazy } from "react";
import { FaStar } from "react-icons/fa";

const Container = lazy(() => import("../../components/layout/Container"));

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

export default function Testimonials({ testimonials = [], loading = false }) {
  const data = testimonials.length ? testimonials : fallbackTestimonials;

  if (loading)
    return (
      <div className="text-center py-24 bg-(--bg) text-[var(--text-secondary)]">
        Loading testimonials...
      </div>
    );

  return (
    <section className="relative py-20 md:py-24 bg-(--bg) text-(--text)">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-(--glow-bg) blur-[140px] rounded-full"></div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            What Our Patients Say
          </h2>

          <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Real stories from people who trusted us with their health.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {data.map((t, i) => (
            <div
              key={i}
              className="
              bg-(--card)
              border border-(--border)
              rounded-2xl
              p-8
              transition-all
              hover:border-[var(--color-primary)]/40
              hover:shadow-[0_0_40px_var(--glow-soft)]"
            >
              <p className="italic text-[var(--text-secondary)] mb-6 leading-relaxed">
                “{t.text}”
              </p>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="text-[var(--color-primary)]" />
                ))}
              </div>

              <p className="font-semibold text-(--text)">{t.name}</p>

              <p className="text-sm text-[var(--text-secondary)]">
                {t.location}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
