import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));

export default function Facilities({
  facilities = [],
  loading = false,
  error = null,
}) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-950/50 min-h-screen">
      <Container>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            State-of-the-Art Facilities
          </h2>
        </div>

        {loading && (
          <div className="text-center py-10">Loading facilities...</div>
        )}

        {error && (
          <div className="text-center py-10 text-red-600">
            Failed to load facilities.
          </div>
        )}

        {!loading && !error && facilities.length === 0 && (
          <div className="text-center py-10">
            No facilities available at the moment.
          </div>
        )}

        {!loading && facilities.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((item, i) => (
              <Card key={i} hover className="text-center h-full">
                <div className="text-5xl mb-5">{item.icon || "🏥"}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
