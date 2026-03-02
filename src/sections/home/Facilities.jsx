import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));

export default function Facilities({ facilities = [] }) {
  if (!facilities.length) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-950/50">
      <Container>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            State-of-the-Art Facilities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((item, i) => (
            <Card key={i} hover className="text-center h-full">
              <div className="text-5xl mb-5">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
