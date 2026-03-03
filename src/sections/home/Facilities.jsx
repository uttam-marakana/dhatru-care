import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));

export default function Facilities({
  facilities = [],
  loading = false,
  error = null,
}) {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full"></div>

      <Container>
        <div className="text-center mb-14 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            State of the Art Facilities
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Equipped with advanced medical technology and modern infrastructure
            to ensure accurate diagnosis, faster recovery, and patient comfort.
          </p>
        </div>

        {loading && (
          <div className="text-center py-10 text-gray-400">
            Loading facilities...
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-red-500">
            Failed to load facilities.
          </div>
        )}

        {!loading && facilities.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {facilities.map((item, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
              >
                <div className="text-5xl mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-500">
                  {item.icon || "🏥"}
                </div>

                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
