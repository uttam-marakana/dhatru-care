import { lazy } from "react";

const ContactForm = lazy(() => import("../components/forms/ContactForm"));
const GoogleMapEmbed = lazy(() => import("../sections/shared/GoogleMapEmbed"));
const PageHero = lazy(() => import("../sections/shared/PageHero"));

export default function Contact() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We're here to help – reach out anytime"
      />

      <section className="py-16 md:py-24 bg-[var(--bg)] text-[var(--text)]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-8">
              {/* MAP */}
              <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_0_40px_var(--glow-soft)">
                <GoogleMapEmbed />
              </div>

              {/* CONTACT DETAILS */}
              <div className="space-y-6">
                <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_40px_var(--glow-soft) transition">
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

                <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/40 p-6 rounded-2xl shadow-[0_0_40px_var(--glow-soft)">
                  <h4 className="font-semibold text-lg mb-2 text-[var(--color-primary)]">
                    Emergency
                  </h4>

                  <p className="text-xl font-bold text-[var(--text)]">
                    +91 98765 43210
                  </p>

                  <p className="text-sm text-(--muted)">24×7 Available</p>
                </div>

                <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_40px_var(--glow-soft) transition">
                  <h4 className="font-semibold text-lg mb-2 text-[var(--color-primary)]">
                    General Enquiry
                  </h4>

                  <p className="text-xl font-bold text-[var(--text)]">
                    +91 12345 67890
                  </p>

                  <p className="text-sm text-(--muted)">Mon–Sat: 8 AM – 8 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
