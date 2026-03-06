import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function TopBar() {
  return (
    <div
      className="
      relative hidden md:block
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
            className="
            flex items-center gap-2
            font-medium
            text-[var(--color-primary)]
            hover:opacity-80
            transition
            "
          >
            <FaPhoneAlt />

            <span>
              24×7 Emergency:
              <strong className="ml-1 tracking-wide text-[var(--text)]">
                +91 98765 43210
              </strong>
            </span>
          </a>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="
            flex items-center gap-2
            hover:text-[var(--color-primary)]
            transition
            "
          >
            <FaWhatsapp className="text-[var(--color-success)]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 font-medium">
          <a
            href="/for-doctors"
            className="hover:text-[var(--color-primary)] transition"
          >
            For Doctors
          </a>

          <a
            href="/careers"
            className="hover:text-[var(--color-primary)] transition"
          >
            Careers
          </a>
        </div>
      </div>
    </div>
  );
}
