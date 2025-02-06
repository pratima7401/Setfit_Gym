import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating a short loading time

    return () => clearTimeout(timeout);
  }, [location.pathname]);

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

      <header className="container bg-gray-800 shadow-md py-3 sticky top-0 z-50 h-16 md:h-20 mb-0">
        {" "}
        {/* Ensure mb-0 is added */}
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="Gym Logo"
                className="h-auto max-h-20 md:max-h-28 lg:max-h-32 w-auto object-contain"
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

            {/* Hamburger Menu */}
            <button
              className="md:hidden text-gray-300 focus:outline-none z-50"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Flyout Menu */}
        <div
          className={`fixed inset-0 z-40 transition-transform transform ease-in-out duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          {/* Flyout Background Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeMenu}
          ></div>

          {/* Flyout Menu Content */}
          <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-gray-800 shadow-lg flex flex-col z-50">
            {/* Flyout Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <span className="text-xl font-bold text-white">Menu</span>
              <button
                className="text-gray-300 focus:outline-none"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={24} />
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
      </header>
    </>
  );
}

export default Header;
