import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navConfig } from "../../config/navConfig";

const Header = ({ panel }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = navConfig[panel];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-50 backdrop-blur-sm shadow-lg p-2"
          : "bg-transparent p-4"
      }`}
    >
      {/* Logo Section */}
      <Link to="/" className="flex items-center group">
        <img src="/logo.png" alt="CareerVista" className="h-12 mr-2" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.map((link, index) => (
          <div key={index}>
            <Link
              to={link.path}
              className="text-white font-bold px-4 py-2 rounded-lg hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300 no-underline relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        ))}
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="text-white md:hidden p-2 rounded-lg hover:bg-yellow-800/50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/50 backdrop-blur-lg md:hidden border-t border-white">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link, index) => (
              <div key={index}>
                <Link
                  to={link.path}
                  className="text-white font-bold px-4 py-3 no-underline rounded-lg block hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
