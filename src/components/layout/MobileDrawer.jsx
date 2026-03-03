import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPhoneAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function MobileDrawer({
  isOpen,
  onClose,
  navItems,
  user,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isDarkMode,
  light_logo,
  dark_logo,
  ThemeToggle,
}) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusable = drawerRef.current.querySelectorAll("a, button, input");
    focusable[0]?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab") {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white"
          role="dialog"
          aria-modal="true"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Blue Glow Aura */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[140px] rounded-full"></div>

          <div
            ref={drawerRef}
            className="relative z-10 flex flex-col h-full px-6 py-6"
          >
            {/* TOP BAR */}
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
                aria-label="Close menu"
                className="p-2 rounded-full border border-white/10 hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* EMERGENCY BLOCK */}
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mb-8 font-semibold shadow-lg shadow-blue-500/30 transition"
            >
              <FaPhoneAlt />
              24×7 Emergency Call
            </a>

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="mb-10">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors, departments..."
                aria-label="Search"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition"
              />
            </form>

            {/* NAVIGATION */}
            <nav className="flex flex-col gap-6 text-lg font-medium text-gray-300">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `transition ${
                      isActive
                        ? "text-blue-400 font-semibold"
                        : "hover:text-blue-400"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex-1" />

            {/* ACCOUNT SECTION */}
            <div className="border-t border-white/10 pt-6 mb-6 text-gray-300">
              {user ? (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="hover:text-blue-400"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/appointments"
                    onClick={onClose}
                    className="hover:text-blue-400"
                  >
                    My Appointments
                  </Link>
                  <button
                    onClick={() => {
                      signOut(auth);
                      onClose();
                    }}
                    className="text-red-500 text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="hover:text-blue-400"
                >
                  Login
                </Link>
              )}
            </div>

            {/* FOOT ACTIONS */}
            <div className="flex justify-between items-center gap-4">
              <ThemeToggle />

              <Link
                to="/appointments"
                onClick={onClose}
                className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition"
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
