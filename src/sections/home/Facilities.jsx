import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));

export default function Facilities({ facilities = [], loading, error }) {
  return (
    <section className="relative py-20 bg-(--bg) text-(--text) overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-(--glow-bg) blur-[120px] rounded-full"></div>

      <Container>
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-(--color-primary)">
            State of the Art Facilities
          </h2>

          <p className="mt-4 text-(--text-secondary) max-w-2xl mx-auto">
            Equipped with advanced technology and modern infrastructure.
          </p>
        </div>

        {loading && (
          <div className="text-center py-10 text-(--text-secondary)">
            Loading facilities...
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-red-500">
            Failed to load facilities.
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((item, i) => (
            <div
              key={i}
              className="bg-(--card) border border-(--border)
              rounded-2xl p-8 text-center transition
              hover:-translate-y-2 hover:border-(--color-primary)/40
              hover:shadow-[0_0_40px_var(--glow-soft)]"
            >
              <div className="text-5xl mb-6 text-(--color-primary)">
                {item.icon || "🏥"}
              </div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <p className="text-(--text-secondary)">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
