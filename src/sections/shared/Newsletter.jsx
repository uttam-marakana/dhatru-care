import Container from "../../components/layout/Container";
import NewsletterForm from "../../components/forms/NewsletterForm";

export default function Newsletter() {
  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Blue Glow Aura */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Stay Informed. Stay Healthy.
          </h2>

          <p className="text-lg md:text-xl mb-10 text-gray-400">
            Receive expert health insights, preventive care updates, seasonal
            wellness tips, and exclusive package offers.
          </p>

          {/* Glass Form Wrapper */}
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            {/* Subtle Top Accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>

            <NewsletterForm />
          </div>

          {/* Trust Microcopy */}
          <div className="mt-8 text-sm text-gray-400 space-y-2">
            <p className="flex justify-center items-center gap-2">
              <span className="text-blue-400">✔</span>
              No spam. Only medical insights.
            </p>
            <p className="flex justify-center items-center gap-2">
              <span className="text-blue-400">✔</span>
              Trusted by thousands of patients.
            </p>
            <p className="flex justify-center items-center gap-2">
              <span className="text-blue-400">✔</span>
              Unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
