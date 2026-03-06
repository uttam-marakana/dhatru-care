import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));

export default function Facilities({ facilities = [], loading, error }) {
  return (
    <section className="relative py-16 md:py-20 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      {/* Background Glow */}
      <div
        className="
        pointer-events-none
        absolute top-0 left-1/2 -translate-x-1/2
        w-[500px] md:w-[700px]
        h-[500px] md:h-[700px]
        bg-[var(--glow-bg)]
        blur-[120px]
        rounded-full
        opacity-60
        -z-10
        "
      />

      <Container>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)]">
            State of the Art Facilities
          </h2>

          <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Equipped with advanced technology and modern infrastructure.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-[var(--text-secondary)]">
            Loading facilities...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-10 text-[var(--color-error)]">
            Failed to load facilities.
          </div>
        )}

        {/* Facilities Grid */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6 md:gap-8
          "
        >
          {facilities.map((item, i) => (
            <div
              key={i}
              className="
              bg-[var(--card)]
              border border-[var(--border)]
              rounded-2xl
              p-6 md:p-8
              text-center
              transition-all duration-300
              hover:-translate-y-2
              hover:border-[var(--color-primary)]/40
              hover:shadow-[0_0_40px_var(--glow-soft)]
              "
            >
              {/* Icon */}
              <div className="text-4xl md:text-5xl mb-5 text-[var(--color-primary)]">
                {item.icon || "🏥"}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-sm md:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
