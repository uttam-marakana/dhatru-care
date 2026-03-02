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

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Our Location</h3>
                <GoogleMapEmbed />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Hospital Address
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    123 Health Avenue,
                    <br />
                    Near Civil Hospital,
                    <br />
                    Gondal, Gujarat 360311
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Emergency</h4>
                  <p className="text-xl font-bold text-primary">
                    +91 98765 43210
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    24×7 Available
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    General Enquiry
                  </h4>
                  <p className="text-xl font-bold">+91 12345 67890</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mon–Sat: 8 AM – 8 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
