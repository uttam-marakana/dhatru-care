import { lazy } from "react";

const ContactForm = lazy(() => import("../components/forms/ContactForm"));
const GoogleMapEmbed = lazy(() => import("../sections/shared/GoogleMapEmbed"));
const PageHero = lazy(() => import("../sections/shared/PageHero"));
const Container = lazy(() => import("../components/layout/Container"));

export default function Contact() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We're here to help – reach out anytime"
      />

      <section className="relative py-20 md:py-24 bg-[var(--section)] text-[var(--text)] overflow-hidden">
        {/* Glow */}
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
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-8">
              {/* MAP */}
              <GoogleMapEmbed />

              {/* CONTACT DETAILS */}

              <div className="space-y-6">
                {/* Address */}
                <div
                  className="
                  bg-[var(--card)]
                  border border-[var(--border)]
                  p-6 rounded-2xl
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-[var(--color-primary)]/40
                  hover:shadow-[0_0_40px_var(--glow-soft)]
                  "
                >
                  <h4 className="font-semibold text-lg mb-2 text-[var(--color-primary)]">
                    Hospital Address
                  </h4>

                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    123 Health Avenue,
                    <br />
                    Near Civil Hospital,
                    <br />
                    Gondal, Gujarat 360311
                  </p>
                </div>

                {/* Emergency */}
                <div
                  className="
                  bg-[var(--color-primary)]/10
                  border border-[var(--color-primary)]/40
                  p-6 rounded-2xl
                  shadow-[0_0_40px_var(--glow-soft)]
                  "
                >
                  <h4 className="font-semibold text-lg mb-2 text-[var(--color-primary)]">
                    Emergency
                  </h4>

                  <p className="text-xl font-bold text-[var(--text)]">
                    +91 98765 43210
                  </p>

                  <p className="text-sm text-[var(--muted)]">24×7 Available</p>
                </div>

                {/* General Enquiry */}
                <div
                  className="
                  bg-[var(--card)]
                  border border-[var(--border)]
                  p-6 rounded-2xl
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-[var(--color-primary)]/40
                  hover:shadow-[0_0_40px_var(--glow-soft)]
                  "
                >
                  <h4 className="font-semibold text-lg mb-2 text-[var(--color-primary)]">
                    General Enquiry
                  </h4>

                  <p className="text-xl font-bold text-[var(--text)]">
                    +91 12345 67890
                  </p>

                  <p className="text-sm text-[var(--muted)]">
                    Mon–Sat: 8 AM – 8 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
