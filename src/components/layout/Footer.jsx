import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";
/* eslint-disable-next-line no-unused-vars -- motion is used as motion.div (JSX member) */
import { motion, AnimatePresence } from "framer-motion";

import PrefetchLink from "../common/PrefetchLink";
import Container from "./Container";

import light_logo from "../../assets/images/light_logo.png";
import dark_logo from "../../assets/images/dark_logo.png";

const SOCIALS = [FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn];

const QUICK_LINKS = ["departments", "doctors", "packages", "blog", "contact"];

const SPECIALITIES = [
  { label: "Cardiology & Heart Care", url: "/departments/cardiology" },
  { label: "Neurology & Neurosurgery", url: "/departments/neurology" },
  { label: "Orthopaedics", url: "/departments/orthopaedics" },
  { label: "Pediatrics", url: "/departments/pediatrics" },
  { label: "Emergency & Trauma Care", url: "/departments/emergency" },
];

const CONTACT_INFO = [
  { Icon: FaMapMarkerAlt, text: "Gondal, Gujarat, India", isPhone: false },
  { Icon: FaPhoneAlt, text: "+91 98765 43210", isPhone: true },
  { Icon: FaEnvelope, text: "care@dhatruhospital.com", isPhone: false },
];

/* --- Accordion column (used below lg: mobile + tablet) ----------- */
const accordionMotion = {
  hidden: { height: 0, opacity: 0 },
  shown: { height: "auto", opacity: 1 },
};

function AccordionColumn({ title, id, isOpen, onToggle, children }) {
  const open = isOpen(id);

  return (
    <div className="border-b border-[var(--border)] lg:border-0">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        className="
          w-full flex items-center justify-between
          py-4 lg:py-0
          text-left
          text-[var(--text)]
          font-semibold
          lg:cursor-default
        "
      >
        <span>{title}</span>

        {/* Chevron only below lg */}
        <span className="lg:hidden text-[var(--muted)]">
          <FaChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {/* Mobile / tablet: animated accordion body */}
      <div className="lg:hidden">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              variants={accordionMotion}
              initial="hidden"
              animate="shown"
              exit="hidden"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pb-5">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: always visible static block */}
      <div className="hidden lg:block">{children}</div>
    </div>
  );
}

/* --- Contact list (shared between accordion & desktop grid) ----------- */
function ContactList() {
  return (
    <ul className="space-y-4 text-[var(--muted)]">
      {CONTACT_INFO.map((item) => (
        <li key={item.text} className="flex gap-3">
          <item.Icon
            className={`text-[var(--color-primary)] ${
              item.isPhone ? "" : "mt-1"
            }`}
          />
          <span className={item.isPhone ? "font-semibold text-[var(--text)]" : ""}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const [openSections, setOpenSections] = useState(() => new Set(["quick"]));

  const toggleSection = (key) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

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
      {/* --- Glow Aura ----------- */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[var(--glow-bg)] blur-[140px] rounded-full"></div>

      <Container className="py-20 relative z-10">
        <div
          className="
            backdrop-blur-xl
            bg-[var(--surface)]/70
            border border-[var(--border)]
            rounded-3xl
            p-5 sm:p-8 lg:p-10
            shadow-[0_0_60px_var(--glow-bg)]
          "
        >
          {/* --- Brand (always visible) ----------- */}
          <div className="space-y-6 mb-8 lg:mb-0">
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

            <p className="text-[var(--muted)] leading-relaxed max-w-md">
              Dhatru Care Multispeciality Hospital delivers compassionate,
              technology-driven healthcare with 24×7 emergency services.
            </p>

            <div className="flex gap-4">
              {SOCIALS.map((Icon, i) => (
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

          {/* --- Mobile / Tablet: stacked accordion ----------- */}
          <div className="lg:hidden">
            <AccordionColumn
              title="Quick Links"
              id="quick"
              isOpen={openSections.has.bind(openSections)}
              onToggle={toggleSection}
            >
              <ul className="space-y-3 text-[var(--muted)]">
                {QUICK_LINKS.map((item) => (
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
            </AccordionColumn>

            <AccordionColumn
              title="Our Specialities"
              id="specialities"
              isOpen={openSections.has.bind(openSections)}
              onToggle={toggleSection}
            >
              <ul className="space-y-3 text-[var(--muted)]">
                {SPECIALITIES.map((item) => (
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
            </AccordionColumn>

            <AccordionColumn
              title="Contact Information"
              id="contact"
              isOpen={openSections.has.bind(openSections)}
              onToggle={toggleSection}
            >
              <ContactList />
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
            </AccordionColumn>
          </div>

          {/* --- Desktop: grid as-is (lg+) ----------- */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-12">
            {/* Quick Links */}
            <div>
              <h4 className="text-[var(--text)] font-semibold mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3 text-[var(--muted)]">
                {QUICK_LINKS.map((item) => (
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
                {SPECIALITIES.map((item) => (
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
              <ContactList />
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

          {/* --- Divider ----------- */}
          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

          {/* --- Bottom ----------- */}
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
