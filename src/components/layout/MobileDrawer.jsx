import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";
import ThemeToggle from "../common/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

export default function MobileDrawer({
  isOpen,
  onClose,
  navItems,
  user,
  isDarkMode,
  light_logo,
  dark_logo,
}) {
  const { logout } = useAuth();

  /* Close drawer with ESC */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
          fixed inset-0 z-50
          bg-[var(--bg)]
          text-[var(--text)]
          "
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col h-full px-6 py-6 backdrop-blur-xl">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-10">
              <Link to="/" onClick={onClose}>
                <img
                  src={isDarkMode ? dark_logo : light_logo}
                  alt="Dhatru Care"
                  className="h-10"
                />
              </Link>

              <button onClick={onClose} aria-label="Close menu">
                <FaTimes size={20} />
              </button>
            </div>

            {/* EMERGENCY CTA */}
            <a
              href="tel:+919876543210"
              className="
              flex items-center justify-center gap-3
              bg-[var(--color-primary)]
              text-white
              py-3 rounded-xl
              mb-10
              font-semibold
              "
            >
              <FaPhoneAlt />
              24×7 Emergency Call
            </a>

            {/* MAIN NAVIGATION */}
            <nav className="flex flex-col gap-6 text-lg font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `transition ${
                      isActive
                        ? "text-[var(--color-primary)] font-semibold"
                        : "text-[var(--text-secondary)] hover:text-[var(--color-primary)]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex-1" />

            {/* ACCOUNT SECTION */}
            <div className="border-t border-[var(--border)] pt-6 mb-6">
              {user ? (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="hover:text-[var(--color-primary)]"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/profile/appointments"
                    onClick={onClose}
                    className="hover:text-[var(--color-primary)]"
                  >
                    My Appointments
                  </Link>

                  <Link
                    to="/settings"
                    onClick={onClose}
                    className="hover:text-[var(--color-primary)]"
                  >
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="
                    flex items-center gap-2
                    text-red-500
                    text-left
                    "
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="hover:text-[var(--color-primary)]"
                >
                  Login
                </Link>
              )}
            </div>

            {/* FOOTER ACTION */}
            <div className="flex items-center justify-between">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
