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

      <section className="py-16 md:py-24 bg-linear-to-b from-[#030712] via-[#111827] to-[#030712] text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-8">
              {/* MAP */}
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                <GoogleMapEmbed />
              </div>

              {/* CONTACT DETAILS */}
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-[#60A5FA]/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition">
                  <h4 className="font-semibold text-lg mb-2 text-[#60A5FA]">
                    Hospital Address
                  </h4>

                  <p className="text-[#9CA3AF] leading-relaxed">
                    123 Health Avenue,
                    <br />
                    Near Civil Hospital,
                    <br />
                    Gondal, Gujarat 360311
                  </p>
                </div>

                <div className="bg-[#60A5FA]/20 border border-[#60A5FA]/40 p-6 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                  <h4 className="font-semibold text-lg mb-2 text-[#60A5FA]">
                    Emergency
                  </h4>

                  <p className="text-xl font-bold text-white">
                    +91 98765 43210
                  </p>

                  <p className="text-sm text-[#9CA3AF]">24×7 Available</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-[#60A5FA]/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition">
                  <h4 className="font-semibold text-lg mb-2 text-[#60A5FA]">
                    General Enquiry
                  </h4>

                  <p className="text-xl font-bold text-white">
                    +91 12345 67890
                  </p>

                  <p className="text-sm text-[#9CA3AF]">Mon–Sat: 8 AM – 8 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
