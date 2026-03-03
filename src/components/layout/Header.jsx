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

  /* AUTH */
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* CLOSE MENU ON ROUTE CHANGE */
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  /* CLOSE SEARCH ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
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
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300
        bg-gradient-to-b from-[#0b1220]/95 via-[#0f1c2f]/95 to-[#0b1220]/95
        border-b border-white/5
        ${scrolled ? "shadow-[0_0_40px_rgba(59,130,246,0.15)]" : ""}
      `}
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

            {/* DESKTOP NAV */}
            <nav className="hidden xl:flex gap-8 font-medium text-gray-400">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive ? "text-blue-400" : "hover:text-blue-400"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="hidden xl:flex items-center gap-6">
              {/* Emergency */}
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm font-medium text-blue-400"
              >
                <FaPhoneAlt />
                24×7 Emergency
              </a>

              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  <FaSearch />
                </button>

                {isSearchOpen && (
                  <form
                    onSubmit={handleSearch}
                    className="absolute right-0 top-full mt-3 w-64 
                    bg-white/5 backdrop-blur-md 
                    border border-white/10 
                    rounded-xl p-4 
                    shadow-[0_0_30px_rgba(59,130,246,0.2)]
                    z-50"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        autoFocus
                        className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                        >
                          <FaTimesCircle className="text-gray-400 hover:text-blue-400" />
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
                    className="text-gray-300 hover:text-blue-400"
                  >
                    <FaUser />
                  </Link>
                  <button onClick={() => signOut(auth)}>
                    <FaSignOutAlt className="text-gray-300 hover:text-blue-400" />
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-300 hover:text-blue-400">
                  Login
                </Link>
              )}

              <ThemeToggle />

              {/* BOOK NOW */}
              <Link
                to="/appointments"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-2.5 rounded-full font-semibold shadow-[0_0_25px_rgba(59,130,246,0.35)] transition"
              >
                Book Appointment
              </Link>
            </div>

            {/* MOBILE MENU */}
            <button
              onClick={() => setIsOpen(true)}
              className="xl:hidden text-gray-300"
              aria-label="Open menu"
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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isDarkMode={isDarkMode}
        light_logo={light_logo}
        dark_logo={dark_logo}
        ThemeToggle={ThemeToggle}
      />

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20" />
    </>
  );
}
