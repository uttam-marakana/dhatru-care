import Container from "../../components/layout/Container";

export default function ContactMap() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Visit Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're located in the heart of Gondal – easy to reach for emergencies
            and consultations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-900 h-[400px] md:h-[500px]">
            {/* Replace with real Google Maps embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.123456789!2d70.7890123456789!3d21.960123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b123456789%3A0xabcdef123456789!2sGondal%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dhatru Care Hospital Location"
            ></iframe>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Hospital Address
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Dhatru Care Multispeciality Hospital
                <br />
                123 Health Avenue, Near Civil Hospital
                <br />
                Gondal, Gujarat 360311
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Emergency (24×7)</h4>
                <p className="text-2xl font-bold text-primary">
                  +91 98765 43210
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">General Enquiry</h4>
                <p className="text-xl font-bold">+91 12345 67890</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Mon–Sat: 8 AM – 8 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
