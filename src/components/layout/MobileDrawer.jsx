import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
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

  /* ---------------- FOCUS TRAP ---------------- */
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
          className="fixed inset-0 z-50 bg-white dark:bg-gray-950"
          role="dialog"
          aria-modal="true"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <div ref={drawerRef} className="flex flex-col h-full px-6 py-6">
            {/* TOP */}
            <div className="flex justify-between items-center mb-8">
              <Link to="/" onClick={onClose}>
                <img
                  src={isDarkMode ? dark_logo : light_logo}
                  alt="logo"
                  className="h-10"
                />
              </Link>

              <button onClick={onClose} aria-label="Close menu" className="p-2">
                <FaTimes size={20} />
              </button>
            </div>

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="mb-8">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search"
                className="w-full border rounded-lg py-3 px-4 bg-transparent"
              />
            </form>

            {/* NAVIGATION */}
            <nav
              className="flex flex-col gap-6 text-lg font-medium"
              aria-label="Mobile Navigation"
            >
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={onClose}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex-1" />

            {/* ACCOUNT */}
            {user ? (
              <div className="flex flex-col gap-4 mb-6">
                <Link to="/profile" onClick={onClose}>
                  Profile
                </Link>
                <Link to="/appointments" onClick={onClose}>
                  Appointments
                </Link>
                <button
                  onClick={() => {
                    signOut(auth);
                    onClose();
                  }}
                  className="text-red-600 text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={onClose} className="mb-6">
                Login
              </Link>
            )}

            {/* THEME + CTA */}
            <div className="flex justify-between items-center">
              <ThemeToggle />
              <Link
                to="/appointment"
                onClick={onClose}
                className="bg-accent text-white px-6 py-3 rounded-full"
              >
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
