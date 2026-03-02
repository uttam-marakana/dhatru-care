import { lazy } from "react";

// Dynamic imports for code splitting
const Container = lazy(() => import("../../components/layout/Container"));
const NewsletterForm = lazy(() => import("../../components/forms/NewsletterForm"));

export default function Newsletter() {
  return (
    <section className="py-16 md:py-20 bg-primary text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            Stay Updated with Health Tips
          </h2>

          <p className="text-lg md:text-xl mb-10 opacity-90">
            Subscribe to our newsletter for the latest medical insights, health
            packages, and hospital updates
          </p>

          <NewsletterForm />

          <p className="mt-6 text-sm opacity-80">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}
