import { useEffect, useState, useRef, lazy } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaTimesCircle,
  FaUser,
  FaSignOutAlt,
  FaPhoneAlt,
} from "react-icons/fa";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef(null);

  /* AUTH STATE */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  /* DARK MODE WATCHER */
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

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* CLOSE MENUS ON ROUTE CHANGE */
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  /* OUTSIDE SEARCH CLOSE */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);

    setSearchQuery("");
    setIsSearchOpen(false);
  };

  return (
    <>
      <header
        className={`
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-xl
        transition-all duration-300
        bg-[var(--surface)]/90
        border-b border-[var(--border)]
        ${scrolled ? "shadow-[0_0_40px_var(--glow-bg)]" : ""}
      `}
      >
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* LOGO */}
            <Link to="/" aria-label="Home">
              <img
                src={isDarkMode ? dark_logo : light_logo}
                alt="Dhatru Care"
                className="h-10 sm:h-12"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden xl:flex gap-8 font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `transition-colors duration-300 ${
                      isActive
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--color-primary)]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden xl:flex items-center gap-6">
              {/* EMERGENCY */}
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
              >
                <FaPhoneAlt />
                24×7 Emergency
              </a>

              {/* SEARCH */}
              <div ref={searchRef} className="relative">
                <button
                  aria-label="Open search"
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                  className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition"
                >
                  <FaSearch />
                </button>

                {isSearchOpen && (
                  <form
                    onSubmit={handleSearch}
                    className="
                    absolute right-0 top-full mt-3 w-64
                    bg-[var(--card)]/90
                    backdrop-blur-md
                    border border-[var(--border)]
                    rounded-xl p-4
                    shadow-[0_0_30px_var(--glow-bg)]
                    z-50
                    "
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        autoFocus
                        className="
                        w-full bg-transparent outline-none
                        text-[var(--text)]
                        placeholder-[var(--muted)]
                        "
                      />

                      {searchQuery && (
                        <button
                          type="button"
                          aria-label="Clear search"
                          onClick={() => setSearchQuery("")}
                        >
                          <FaTimesCircle className="text-[var(--muted)] hover:text-[var(--color-primary)]" />
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>

              {/* USER */}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    aria-label="Profile"
                    className="text-[var(--text-secondary)] hover:text-[var(--color-primary)]"
                  >
                    <FaUser />
                  </Link>

                  <button
                    aria-label="Logout"
                    onClick={() => signOut(auth)}
                    className="text-[var(--text-secondary)] hover:text-[var(--color-primary)]"
                  >
                    <FaSignOutAlt />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-[var(--text-secondary)] hover:text-[var(--color-primary)]"
                >
                  Login
                </Link>
              )}

              <ThemeToggle />

              {/* CTA */}
              <Link
                to="/appointment"
                className="
                bg-[var(--color-primary)]
                hover:bg-[var(--color-primary-hover)]
                text-white
                px-6 py-2.5
                rounded-full
                font-semibold
                shadow-[0_0_25px_var(--glow-soft)]
                transition-all duration-300
                "
              >
                Book Appointment
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              aria-label="Open menu"
              onClick={() => setIsOpen(true)}
              className="xl:hidden text-[var(--text-secondary)]"
            >
              <FaBars size={20} />
            </button>
          </div>
        </Container>
      </header>

      {/* MOBILE DRAWER */}
      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={navItems}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isDarkMode={isDarkMode}
        light_logo={light_logo}
        dark_logo={dark_logo}
        ThemeToggle={ThemeToggle}
      />

      {/* HEADER OFFSET */}
      <div className="h-16 sm:h-20" />
    </>
  );
}
