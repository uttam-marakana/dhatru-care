import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPhoneAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function MobileDrawer({
  isOpen,
  onClose,
  navItems,
  user,
  isDarkMode,
  light_logo,
  dark_logo,
  ThemeToggle,
}) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusable = drawerRef.current.querySelectorAll("a, button");
    focusable[0]?.focus();

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-[var(--bg)] text-[var(--text)]"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
        >
          <div
            ref={drawerRef}
            className="flex flex-col h-full px-6 py-6 backdrop-blur-xl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-10">
              <Link to="/" onClick={onClose}>
                <img
                  src={isDarkMode ? dark_logo : light_logo}
                  alt="logo"
                  className="h-10"
                />
              </Link>

              <button
                onClick={onClose}
                className="p-2 rounded-full border border-[var(--border)]"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* EMERGENCY */}
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-3 bg-[var(--color-primary)] text-white py-3 rounded-xl mb-8"
            >
              <FaPhoneAlt />
              24×7 Emergency Call
            </a>

            {/* NAV */}
            <nav className="flex flex-col gap-6 text-lg font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--text-secondary)]"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex-1" />

            {/* ACCOUNT */}
            <div className="border-t border-[var(--border)] pt-6 mb-6">
              {user ? (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center gap-2"
                  >
                    <FaUser /> Profile
                  </Link>

                  <button
                    onClick={() => {
                      signOut(auth);
                      onClose();
                    }}
                    className="flex items-center gap-2 text-[var(--color-error)]"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={onClose}>
                  Login
                </Link>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <Link
                to="/appointments"
                onClick={onClose}
                className="flex-1 text-center bg-[var(--color-primary)] text-white py-3 rounded-xl"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
