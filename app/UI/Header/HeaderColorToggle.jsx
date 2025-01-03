"use client";

import { useEffect, useState } from "react";

const HeaderColorToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync theme with localStorage and <html> element on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark =
      storedTheme === "dark" || (!storedTheme && systemPrefersDark);
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Toggle theme and save preference
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default HeaderColorToggle;
