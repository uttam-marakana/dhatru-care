import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="bg-primary text-white text-sm py-2.5 hidden md:block">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-base" />
            <span>
              Emergency 24×7: <strong>+91 98765 43210</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaWhatsapp className="text-base" />
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-2"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex gap-5 text-sm">
          <a href="/for-doctors" className="hover:underline underline-offset-2">
            For Doctors
          </a>
          <a href="/careers" className="hover:underline underline-offset-2">
            Careers
          </a>
        </div>
      </div>
    </div>
  );
}
