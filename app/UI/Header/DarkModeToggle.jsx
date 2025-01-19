"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      localStorage.setItem("theme", "dark"); // Default theme is dark
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <SunIcon
        className={`w-6 h-6 transition-colors duration-300 ${
          isDarkMode ? "text-gray-400" : "text-yellow-500"
        }`}
      />
      <button
        onClick={toggleTheme}
        className={`relative flex items-center justify-center w-12 h-6 rounded-full transition-colors duration-300 ${
          isDarkMode ? "bg-gray-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute left-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            isDarkMode ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <MoonIcon
        className={`w-6 h-6 transition-colors duration-300 ${
          isDarkMode ? "text-blue-500" : "text-gray-400"
        }`}
      />
    </div>
  );
};

export default DarkModeToggle;
