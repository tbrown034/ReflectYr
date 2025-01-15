"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const HeaderColorToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync theme on mount
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

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Sun Icon for Light Mode */}
      <SunIcon className="w-6 h-6 text-yellow-700 dark:text-gray-400" />

      {/* Toggle Switch */}
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        className="relative inline-flex items-center w-12 h-6 bg-gray-200 rounded-full dark:bg-gray-700"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white ${
            isDarkMode ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </Switch>

      {/* Moon Icon for Dark Mode */}
      <MoonIcon className="w-6 h-6 text-gray-400 dark:text-blue-500" />
    </div>
  );
};

export default HeaderColorToggle;
