// src/components/layout/Footer.jsx
import { useState, useEffect } from "react";
import Container from "./Container";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import light_logo from "../../assets/images/light_logo.png";
import dark_logo from "../../assets/images/dark_logo.png"; // add your dark logo path
import { Link } from "react-router-dom";

export default function Footer() {
  const [logoError, setLogoError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-gray-950 text-gray-300">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 – Brand, logo & description */}
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label="Go to homepage"
            >
              {!logoError ? (
                <img
                  src={isDarkMode ? dark_logo : light_logo}
                  alt="Dhatru Care Logo"
                  onError={() => setLogoError(true)}
                  className="
                    w-auto 
                    h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20
                    max-w-none
                    min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[280px] xl:min-w-[320px]
                    object-contain 
                    transition-all duration-300
                  "
                />
              ) : (
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Dhatru Care
                </span>
              )}
            </Link>

            <p className="text-gray-400 leading-relaxed">
              Premium multispeciality hospital in Gondal providing compassionate
              care, advanced treatments, and 24×7 emergency services.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/departments" className="hover:text-white transition">
                  Departments
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition">
                  Doctors
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-white transition">
                  Health Packages
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 – Specialities */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Our Specialities
            </h4>
            <ul className="space-y-3">
              <li>Cardiology & Heart Care</li>
              <li>Neurology & Neurosurgery</li>
              <li>Orthopaedics & Joint Replacement</li>
              <li>Pediatrics & Neonatology</li>
              <li>Emergency & Critical Care</li>
            </ul>
          </div>

          {/* Column 4 – Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-xl text-primary mt-1 flex-shrink-0" />
                <span>
                  Dhatru Care Multispeciality Hospital
                  <br />
                  123 Health Avenue, Near Civil Hospital
                  <br />
                  Gondal, Gujarat 360311
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-xl text-primary flex-shrink-0" />
                <span>+91 98765 43210 (Emergency 24×7)</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-xl text-primary flex-shrink-0" />
                <span>care@dhatruhospital.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Dhatru Care Multispeciality Hospital. All
          rights reserved.
        </div>
      </Container>
    </footer>
  );
}
