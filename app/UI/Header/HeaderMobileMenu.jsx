"use client"; // Indicates this is a Client Component
import React, { useState } from "react";
import HeaderNavBar from "./HeaderNavBar"; // Reuse the same server-side NavBar
import HeaderLogInProfileToggle from "./HeaderLogInProfileToggle";
import HeaderDarkToggle from "./HeaderDarkToggle";

const HeaderMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        className="flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 w-full bg-gray-400 shadow-md top-16"
        >
          <nav className="flex flex-col items-center gap-4 p-4">
            <HeaderNavBar />
            <HeaderLogInProfileToggle />
            <HeaderDarkToggle />
          </nav>
        </div>
      )}
    </div>
  );
};

export default HeaderMobileMenu;
