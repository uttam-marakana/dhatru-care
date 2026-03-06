import Container from "../../components/layout/Container";
import NewsletterForm from "../../components/forms/NewsletterForm";

export default function Newsletter() {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-175 bg-(--glow-bg) blur-[140px] rounded-full"></div>

      <Container>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-primary)]">
            Stay Informed. Stay Healthy.
          </h2>

          <p className="text-lg md:text-xl mb-10 text-[var(--text-secondary)]">
            Receive expert health insights, preventive care updates, seasonal
            wellness tips, and exclusive package offers.
          </p>

          <div className="relative bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-[0_0_40px_var(--glow-soft)]">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[var(--color-primary)]"></div>

            <NewsletterForm />
          </div>

          <div className="mt-8 text-sm text-[var(--text-secondary)] space-y-2">
            <p className="flex justify-center items-center gap-2">
              <span className="text-[var(--color-primary)]">✔</span>
              No spam. Only medical insights.
            </p>

            <p className="flex justify-center items-center gap-2">
              <span className="text-[var(--color-primary)]">✔</span>
              Trusted by thousands of patients.
            </p>

            <p className="flex justify-center items-center gap-2">
              <span className="text-[var(--color-primary)]">✔</span>
              Unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
