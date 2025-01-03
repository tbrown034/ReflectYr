"use client"; // This ensures the component runs on the client

import React, { useState, useRef, useEffect } from "react";
import HeaderNavBar from "./HeaderNavBar"; // Reuse the same NavBar component

const HeaderMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="relative md:hidden" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        className="flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle mobile menu"
      >
        {/* Hamburger Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        id="mobile-menu"
        className={`absolute border-2 rounded-xl border-white border-opacity-10 right-0 bg-gray-900/60 backdrop-blur-lg shadow-md transition-all duration-300 ${
          isMenuOpen
            ? "top-12 opacity-100"
            : "top-0 opacity-0 pointer-events-none"
        }`}
        style={{ minWidth: "max-content", padding: "1rem" }}
      >
        {isMenuOpen && (
          <nav className="flex flex-col items-center gap-4 text-white">
            <HeaderNavBar
              onClickLink={() => setIsMenuOpen(false)} // Close menu when a link is clicked
            />
          </nav>
        )}
      </div>
    </div>
  );
};

export default HeaderMobileMenu;
