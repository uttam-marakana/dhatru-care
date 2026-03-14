import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import PrefetchLink from "../common/PrefetchLink";
import Container from "./Container";

import light_logo from "../../assets/images/light_logo.png";
import dark_logo from "../../assets/images/dark_logo.png";

export default function Footer() {
  const socials = [FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn];

  const quickLinks = ["departments", "doctors", "packages", "blog", "contact"];

  const specialities = [
    {
      label: "Cardiology & Heart Care",
      url: "/departments/cardiology",
    },
    {
      label: "Neurology & Neurosurgery",
      url: "/departments/neurology",
    },
    {
      label: "Orthopaedics",
      url: "/departments/orthopaedics",
    },
    {
      label: "Pediatrics",
      url: "/departments/pediatrics",
    },
    {
      label: "Emergency & Trauma Care",
      url: "/departments/emergency",
    },
  ];

  return (
    <footer
      className="
      relative
      bg-[var(--bg)]
      text-[var(--text-secondary)]
      border-t border-[var(--border)]
      overflow-hidden
      "
    >
      {/* Glow Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[var(--glow-bg)] blur-[140px] rounded-full"></div>

      <Container className="py-20 relative z-10">
        <div
          className="
          backdrop-blur-xl
          bg-[var(--surface)]/70
          border border-[var(--border)]
          rounded-3xl
          p-10
          shadow-[0_0_60px_var(--glow-bg)]
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <PrefetchLink to="/" aria-label="Dhatru Care">
                <img
                  src={light_logo}
                  className="block dark:hidden h-16 object-contain"
                  alt="Dhatru Care"
                />
                <img
                  src={dark_logo}
                  className="hidden dark:block h-16 object-contain"
                  alt="Dhatru Care"
                />
              </PrefetchLink>

              <p className="text-[var(--muted)] leading-relaxed">
                Dhatru Care Multispeciality Hospital delivers compassionate,
                technology-driven healthcare with 24×7 emergency services.
              </p>

              <div className="flex gap-4">
                {socials.map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="
                    w-9 h-9 flex items-center justify-center
                    rounded-full
                    border border-[var(--border)]
                    hover:border-[var(--color-primary)]/40
                    hover:text-[var(--color-primary)]
                    hover:shadow-[0_0_20px_var(--glow-soft)]
                    transition
                    "
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[var(--text)] font-semibold mb-6">
                Quick Links
              </h4>

              <ul className="space-y-3 text-[var(--muted)]">
                {quickLinks.map((item) => (
                  <li key={item}>
                    <PrefetchLink
                      to={`/${item}`}
                      className="hover:text-[var(--color-primary)] transition-colors"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </PrefetchLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialities */}
            <div>
              <h4 className="text-[var(--text)] font-semibold mb-6">
                Our Specialities
              </h4>

              <ul className="space-y-3 text-[var(--muted)]">
                {specialities.map((item) => (
                  <li key={item.url}>
                    <PrefetchLink
                      to={item.url}
                      className="hover:text-[var(--color-primary)] transition-colors"
                    >
                      {item.label}
                    </PrefetchLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[var(--text)] font-semibold mb-6">
                Contact Information
              </h4>

              <ul className="space-y-4 text-[var(--muted)]">
                <li className="flex gap-3">
                  <FaMapMarkerAlt className="text-[var(--color-primary)] mt-1" />
                  Gondal, Gujarat, India
                </li>

                <li className="flex gap-3 items-center">
                  <FaPhoneAlt className="text-[var(--color-primary)]" />
                  <span className="font-semibold text-[var(--text)]">
                    +91 98765 43210
                  </span>
                </li>

                <li className="flex gap-3">
                  <FaEnvelope className="text-[var(--color-primary)] mt-1" />
                  care@dhatruhospital.com
                </li>
              </ul>

              <div
                className="
                mt-6
                bg-[var(--color-primary)]/10
                border border-[var(--color-primary)]/40
                text-[var(--color-primary)]
                p-4 rounded-xl
                text-sm
                backdrop-blur-md
                "
              >
                24×7 Emergency Support Available
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

          {/* Bottom */}
          <div className="pt-8 text-center text-sm text-[var(--muted)] space-y-3">
            <p>
              © {new Date().getFullYear()} Dhatru Care Multispeciality Hospital.
              All rights reserved.
            </p>

            <div className="flex justify-center gap-6">
              <PrefetchLink
                to="/privacy"
                className="hover:text-[var(--color-primary)]"
              >
                Privacy Policy
              </PrefetchLink>

              <PrefetchLink
                to="/terms"
                className="hover:text-[var(--color-primary)]"
              >
                Terms & Conditions
              </PrefetchLink>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
