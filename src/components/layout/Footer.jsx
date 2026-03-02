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

// Dynamic imports for code splitting
const Container = lazy(() => import("./Container"));

import light_logo from "../../assets/images/light_logo.png";
import dark_logo from "../../assets/images/dark_logo.png";

export default function Footer() {
  return (
    <footer
      className="bg-white dark:bg-gray-950
      text-gray-700 dark:text-gray-300
      border-t border-gray-200 dark:border-gray-800"
    >
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <Link to="/">
              <img
                src={light_logo}
                className="block dark:hidden h-14 object-contain"
              />
              <img
                src={dark_logo}
                className="hidden dark:block h-14 object-contain"
              />
            </Link>

            <p className="text-gray-600 dark:text-gray-400">
              Premium multispeciality hospital in Gondal providing compassionate
              care and advanced treatments.
            </p>

            <div className="flex gap-5 text-gray-500 dark:text-gray-400">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["departments", "doctors", "packages", "blog", "contact"].map(
                (i) => (
                  <li key={i}>
                    <Link
                      to={`/${i}`}
                      className="hover:text-gray-900 dark:hover:text-white"
                    >
                      {i.charAt(0).toUpperCase() + i.slice(1)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">
              Our Specialities
            </h4>
            <ul className="space-y-3">
              <li>Cardiology & Heart Care</li>
              <li>Neurology & Neurosurgery</li>
              <li>Orthopaedics</li>
              <li>Pediatrics</li>
              <li>Emergency Care</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-primary" /> Gondal, Gujarat
              </li>
              <li className="flex gap-3">
                <FaPhoneAlt className="text-primary" /> +91 98765 43210
              </li>
              <li className="flex gap-3">
                <FaEnvelope className="text-primary" /> care@dhatruhospital.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Dhatru Care. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
