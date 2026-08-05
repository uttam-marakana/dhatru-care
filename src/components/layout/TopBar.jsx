import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div
      className="
      relative z-40 hidden md:block
      bg-[var(--surface)]
      border-b border-[var(--border)]
      text-[var(--text-secondary)]
      text-sm py-2.5 overflow-hidden
      "
    >
      {/* Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--glow-bg)] blur-[120px] rounded-full"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <a
            href="tel:+919876543210"
            aria-label="Call emergency number"
            className="
            flex items-center gap-2
            font-bold
            text-red-600
            "
          >
            <FaPhoneAlt />

            <span>
              24×7 Emergency
              {/* <strong className="ml-1 tracking-wide text-[var(--text)]">
                +91 98765 43210
              </strong> */}
            </span>
          </a>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 font-medium">
          <a
            href="https://wa.me/919876543210?text=Hi%20Dhatru%20Care%2C%20I%20would%20like%20to%20chat%20about%20an%20appointment."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Dhatru Care on WhatsApp"
            className="
            flex items-center gap-2
            hover:text-[var(--color-primary)]
            transition
            "
          >
            <FaWhatsapp className="text-[var(--color-success)]" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* <Link to="#" className="hover:text-[var(--color-primary)] transition">
            Careers
          </Link> */}
        </div>
      </div>
    </div>
  );
}
