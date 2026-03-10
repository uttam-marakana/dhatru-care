import { lazy } from "react";

import Container from "../../components/layout/Container";

export default function Facilities({ facilities = [], loading, error }) {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--section)] text-[var(--text)] overflow-hidden">
      {/* Background Glow */}
      <div
        className="
        pointer-events-none
        absolute -top-40 left-1/2 -translate-x-1/2
        w-[700px] md:w-[900px]
        h-[700px] md:h-[900px]
        bg-[var(--glow-bg)]
        blur-[140px]
        rounded-full
        opacity-70
        z-0
        "
      />

      <Container className="relative z-10">
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
            Failed to load facilities...
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {facilities.map((item, i) => (
            <div
              key={i}
              className="
              group
              relative
              bg-[var(--card)]
              border border-[var(--border)]
              rounded-2xl
              p-6 md:p-8
              text-center
              backdrop-blur-xl
              transition-all duration-500
              hover:-translate-y-2
              hover:border-[var(--color-primary)]/40
              hover:shadow-[0_0_40px_var(--glow-soft)]
              "
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="
                  w-14 h-14
                  md:w-16 md:h-16
                  flex items-center justify-center
                  rounded-xl
                  bg-[var(--surface)]
                  text-[var(--color-primary)]
                  text-2xl md:text-3xl
                  group-hover:scale-110
                  transition duration-500
                  "
                >
                  {item.icon || "🏥"}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-[var(--text)]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-sm md:text-base mb-5">
                {item.desc}
              </p>

              {/* CTA */}
              <span className="text-[var(--color-primary)] text-sm font-medium hover:underline cursor-pointer">
                Get Started →
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
