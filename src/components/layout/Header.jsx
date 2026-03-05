import { useEffect, useState, useRef, lazy } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaUser, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Container = lazy(() => import("./Container"));
const ThemeToggle = lazy(() => import("../common/ThemeToggle"));
const MobileDrawer = lazy(() => import("./MobileDrawer"));

import light_logo from "../../assets/images/light_logo.png";
import dark_logo from "../../assets/images/dark_logo.png";

const navItems = [
  { to: "/departments", label: "Departments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/packages", label: "Packages" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* AUTH WATCH */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  /* DARK MODE WATCH */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsDarkMode(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  /* SCROLL SHADOW */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* CLOSE MOBILE ON ROUTE CHANGE */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50
        backdrop-blur-xl
        transition-all duration-300
        bg-(--surface)/80
        border-b border-(--border)
        ${scrolled ? "shadow-[0_0_40px_var(--glow-bg)" : ""}`}
      >
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* LOGO */}
            <Link to="/">
              <img
                src={isDarkMode ? dark_logo : light_logo}
                alt="Dhatru Care"
                className="h-10 sm:h-12"
              />
            </Link>

            {/* NAV */}
            <nav className="hidden xl:flex gap-8 font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-(--color-primary)"
                      : "text-(--text-secondary) hover:text-(--color-primary)"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="hidden xl:flex items-center gap-6">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm font-medium text-(--color-primary)"
              >
                <FaPhoneAlt />
                24×7 Emergency
              </a>

              {/* ACCOUNT */}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-(--text-secondary) hover:text-(--color-primary)"
                  >
                    <FaUser size={18} />
                  </Link>

                  <button
                    onClick={() => signOut(auth)}
                    className="text-(--text-secondary) hover:text-(--color-primary)"
                  >
                    <FaSignOutAlt size={18} />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-(--text-secondary) hover:text-(--color-primary)"
                >
                  Login
                </Link>
              )}

              <ThemeToggle />

              <Link
                to="/appointment"
                className="bg-(--color-primary) hover:bg-(--color-primary-hover) text-white px-6 py-2.5 rounded-full font-semibold shadow-[0_0_25px_var(--glow-soft)"
              >
                Book Appointment
              </Link>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsOpen(true)}
              className="xl:hidden text-(--text-secondary)"
            >
              <FaBars size={20} />
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={navItems}
        user={user}
        isDarkMode={isDarkMode}
        light_logo={light_logo}
        dark_logo={dark_logo}
        ThemeToggle={ThemeToggle}
      />

      <div className="h-16 sm:h-20" />
    </>
  );
}
