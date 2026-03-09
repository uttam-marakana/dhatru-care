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
import { useAuth } from "../../context/AuthContext";

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

  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* NEW STATE FOR USER DROPDOWN */
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  /* AUTH STATE */
  const { user, logout } = useAuth();

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
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  /* OUTSIDE SEARCH CLOSE */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
      }
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
                <NavLink key={item.to} to={item.to}>
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
                >
                  <FaSearch />
                </button>

                {isSearchOpen && (
                  <form
                    onSubmit={handleSearch}
                    className="absolute right-0 top-full mt-3 w-64 bg-[var(--card)] border rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        autoFocus
                        className="w-full bg-transparent outline-none"
                      />

                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                        >
                          <FaTimesCircle />
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>

              {/* USER DROPDOWN */}
              {user ? (
                <div ref={userMenuRef} className="relative">
                  <button onClick={() => setIsUserMenuOpen((prev) => !prev)}>
                    <FaUser />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[var(--card)] border rounded-xl shadow-lg">
                      <div className="px-4 py-3 border-b text-sm">
                        <p>Signed in as</p>
                        <p className="font-medium truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/profile/appointments"
                        className="block px-4 py-3 hover:bg-[var(--surface)]"
                      >
                        My Appointments
                      </Link>

                      <Link
                        to="/profile"
                        className="block px-4 py-3 hover:bg-[var(--surface)]"
                      >
                        Profile
                      </Link>

                      <Link
                        to="/settings"
                        className="block px-4 py-3 hover:bg-[var(--surface)]"
                      >
                        Settings
                      </Link>

                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 flex items-center gap-2"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">Login</Link>
              )}

              <ThemeToggle />

              {/* CTA */}
              <Link
                to="/appointments"
                className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full"
              >
                Book Appointment
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button onClick={() => setIsOpen(true)} className="xl:hidden">
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
      />

      <div className="h-16 sm:h-20" />
    </>
  );
}
