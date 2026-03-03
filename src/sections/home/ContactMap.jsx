import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));

export default function ContactMap() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-950 border-t">
      <Container>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Visit Us
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're located in the heart of Gondal — easy to reach for
            emergencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* MAP */}
          <div className="rounded-2xl overflow-hidden shadow-xl border bg-gray-100 dark:bg-gray-900 h-[300px] sm:h-[350px] md:h-[420px]">
            <iframe
              title="Hospital Location"
              src="https://www.google.com/maps/embed?..."
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-3">Hospital Address</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Dhatru Care Multispeciality Hospital
                <br />
                Gondal, Gujarat
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Emergency (24×7)</h4>
              <p className="text-2xl font-bold text-primary">+91 98765 43210</p>
            </div>

            <div>
              <h4 className="font-semibold">General Enquiry</h4>
              <p className="text-xl font-bold">+91 12345 67890</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
