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
        className={`w-6 h-6 ${
          isDarkMode ? "text-gray-400" : "text-yellow-500"
        }`}
      />
      <button
        onClick={toggleTheme}
        className={`flex items-center justify-center w-10 h-5 rounded-full ${
          isDarkMode ? "bg-gray-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
            isDarkMode ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <MoonIcon
        className={`w-6 h-6 ${isDarkMode ? "text-blue-500" : "text-gray-400"}`}
      />
    </div>
  );
};

export default DarkModeToggle;
