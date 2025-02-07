import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // Disable background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Active Batches", path: "/classes" },
    { name: "Special Groove", path: "/speciality" },
    { name: "About Us", path: "/about" },
    { name: "Trainers", path: "/trainers" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"></div>
      )}

      <header className="container bg-gray-800 shadow-md py-3 sticky top-0 z-50 h-16 md:h-20">
        <div className="container mx-auto px-4 h-full flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
  <img
    src={Logo}
    alt="Gym Logo"
    className="h-16 md:h-24 lg:h-28 w-auto object-contain"
  />
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-gray-300 hover:text-purple-400 transition-colors ${
                  location.pathname === item.path ? "text-purple-400" : ""
                }`}
                onClick={() => setLoading(true)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            className="md:hidden text-gray-300 focus:outline-none z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Flyout Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
            <div
              ref={menuRef}
              className="absolute right-0 top-0 bottom-0 w-2/3 bg-gray-800 shadow-lg flex flex-col z-50"
            >
              {/* Close Button inside the menu */}
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <span className="text-xl font-bold text-white">Menu</span>
                <button
                  className="text-gray-300 focus:outline-none"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                </button>
              </div>

              {/* Flyout Navigation */}
              <nav className="flex flex-col p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-gray-300 hover:text-purple-400 transition-colors py-2 ${
                      location.pathname === item.path ? "text-purple-400" : ""
                    }`}
                    onClick={() => {
                      closeMenu();
                      setLoading(true);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
