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
    <header className={`fixed top-0 left-0  rounded-full w-full z-50 transition-all duration-300 ${
      isScrolled ? "p-2 shadow-2xl bg-black/40" : "p-4"
    }`}>
      <div className="  rounded-xl">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src="/logo.png" alt="CareerVista" className="h-8 mr-2 hover:scale-105 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className=" hover:text-yellow-400  no-underline text-white uppercase font-mono font-bold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute margin no-underline left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden  hover:text-yellow-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className=" md:hidden  mt-2 mx-4 rounded-xl">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="block px-4 py-3  no-underline text-white uppercase font-mono font-bold hover:text-yellow-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;