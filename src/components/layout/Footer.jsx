import { lazy } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Container = lazy(() => import("./Container"));

import light_logo from "../../assets/images/light_logo.png";
import dark_logo from "../../assets/images/dark_logo.png";

export default function Footer() {
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
        {/* Glass Panel */}
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
              <Link to="/">
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
              </Link>

              <p className="text-[var(--muted)] leading-relaxed">
                Dhatru Care Multispeciality Hospital delivers compassionate,
                technology-driven healthcare with 24×7 emergency services.
              </p>

              <div className="flex gap-4">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                  (Icon, i) => (
                    <div
                      key={i}
                      className="
                      w-9 h-9 flex items-center justify-center
                      rounded-full
                      border border-[var(--border)]
                      hover:border-[var(--color-main)]/40
                      hover:text-[var(--color-main)]
                      hover:shadow-[0_0_20px_var(--glow-soft)]
                      transition cursor-pointer
                      "
                    >
                      <Icon size={14} />
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[var(--text)] font-semibold mb-6">
                Quick Links
              </h4>

              <ul className="space-y-3 text-[var(--muted)]">
                {["departments", "doctors", "packages", "blog", "contact"].map(
                  (i) => (
                    <li key={i}>
                      <Link
                        to={`/${i}`}
                        className="hover:text-[var(--color-main)] transition-colors"
                      >
                        {i.charAt(0).toUpperCase() + i.slice(1)}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Specialities */}
            <div>
              <h4 className="text-[var(--text)] font-semibold mb-6">
                Our Specialities
              </h4>

              <ul className="space-y-3 text-[var(--muted)]">
                <li>Cardiology & Heart Care</li>
                <li>Neurology & Neurosurgery</li>
                <li>Orthopaedics</li>
                <li>Pediatrics</li>
                <li>Emergency & Trauma Care</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[var(--text)] font-semibold mb-6">
                Contact Information
              </h4>

              <ul className="space-y-4 text-[var(--muted)]">
                <li className="flex gap-3">
                  <FaMapMarkerAlt className="text-[var(--color-main)] mt-1" />
                  Gondal, Gujarat, India
                </li>

                <li className="flex gap-3 items-center">
                  <FaPhoneAlt className="text-[var(--color-main)]" />
                  <span className="font-semibold text-[var(--text)]">
                    +91 98765 43210
                  </span>
                </li>

                <li className="flex gap-3">
                  <FaEnvelope className="text-[var(--color-main)] mt-1" />
                  care@dhatruhospital.com
                </li>
              </ul>

              {/* Emergency Highlight */}
              <div
                className="
                mt-6
                bg-[var(--color-main)]/10
                border border-[var(--color-main)]/40
                text-[var(--color-main)]
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

          {/* Bottom Strip */}
          <div className="pt-8 text-center text-sm text-[var(--muted)] space-y-3">
            <p>
              © {new Date().getFullYear()} Dhatru Care Multispeciality Hospital.
              All rights reserved.
            </p>

            <div className="flex justify-center gap-6">
              <Link to="/privacy" className="hover:text-[var(--color-main)]">
                Privacy Policy
              </Link>

              <Link to="/terms" className="hover:text-[var(--color-main)]">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
