import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function TopBar() {
  return (
    <div
      className="
      relative hidden md:block
      z-10
      bg-(--surface)
      border-b border-(--border)
      text-(--text-secondary)
      text-sm py-2.5 overflow-hidden
      "
    >
      {/* Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-125 h-125 bg-(--glow-bg) blur-[120px] rounded-full"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 font-medium text-main hover:opacity-80 transition"
          >
            <FaPhoneAlt />
            <span>
              24×7 Emergency:
              <strong className="ml-1 tracking-wide text-(--text)">
                +91 98765 43210
              </strong>
            </span>
          </a>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-main transition"
          >
            <FaWhatsapp className="text-complete" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 font-medium">
          <a
            href="/for-doctors"
            className="hover:text-main transition"
          >
            For Doctors
          </a>

          <a href="/careers" className="hover:text-main transition">
            Careers
          </a>
        </div>
      </div>
    </div>
  );
}
