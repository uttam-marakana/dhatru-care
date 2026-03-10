import { useEffect, useState, useRef, lazy, Suspense } from "react";

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
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  const lastScrollY = useRef(0);

  /* Dark mode observer */

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

  /* Smart scroll behavior */

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 10);

      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close menus on route change */

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  /* Outside click detection */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const esc = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", esc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", esc);
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
        transition-all duration-300
        backdrop-blur-xl
        bg-[var(--surface)]/90
        border-b border-[var(--border)]
        ${scrolled ? "shadow-[0_0_40px_var(--glow-bg)]" : ""}
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
      >
        <Suspense fallback={null}>
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
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
                >
                  <FaPhoneAlt />
                  24×7 Emergency
                </a>

                {/* SEARCH */}

                <div ref={searchRef} className="relative">
                  <button onClick={() => setIsSearchOpen((p) => !p)}>
                    <FaSearch />
                  </button>

                  {isSearchOpen && (
                    <form
                      onSubmit={handleSearch}
                      className="absolute right-0 top-full mt-3 w-64 bg-[var(--card)] border rounded-xl p-4"
                    >
                      <div className="flex gap-3">
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

                {/* USER MENU */}

                {user ? (
                  <div ref={userMenuRef} className="relative">
                    <button onClick={() => setIsUserMenuOpen((p) => !p)}>
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
                          className="block px-4 py-3"
                        >
                          My Appointments
                        </Link>

                        <Link to="/profile" className="block px-4 py-3">
                          Profile
                        </Link>

                        <Link to="/settings" className="block px-4 py-3">
                          Settings
                        </Link>

                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-3 text-red-500 flex gap-2"
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

                <Link
                  to="/appointments"
                  className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full"
                >
                  Book Appointment
                </Link>
              </div>

              {/* MOBILE ACTIONS */}

              <div className="flex items-center gap-4 xl:hidden">
                <button onClick={() => setIsSearchOpen((p) => !p)}>
                  <FaSearch size={18} />
                </button>

                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsOpen(true);
                  }}
                >
                  <FaBars size={20} />
                </button>
              </div>
            </div>
          </Container>
        </Suspense>

        {/* MOBILE SEARCH */}

        {isSearchOpen && (
          <div className="xl:hidden px-4 pb-4">
            <form
              onSubmit={handleSearch}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, departments..."
                  autoFocus
                  className="w-full bg-transparent outline-none"
                />

                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")}>
                    <FaTimesCircle />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </header>

      <Suspense fallback={null}>
        <MobileDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItems}
          user={user}
          isDarkMode={isDarkMode}
          light_logo={light_logo}
          dark_logo={dark_logo}
        />
      </Suspense>

      <div className="h-16 sm:h-20" />
    </>
  );
}
