"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Dropdown({ session }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Menu Button */}
      <MenuButton className="flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-gray-500">
        <HiMenu className="w-6 h-6 text-gray-900 dark:text-gray-200" />
      </MenuButton>

      {/* Dropdown Items */}
      <MenuItems className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 dark:divide-gray-700 dark:ring-gray-200">
        {/* Navigation Links */}
        <div className="p-2">
          <MenuItem>
            {({ active }) => (
              <Link
                href="/movies"
                className={`block px-4 py-2 text-sm ${
                  active
                    ? "bg-amber-500 text-white"
                    : "text-gray-900 dark:text-gray-200"
                }`}
              >
                Movies
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <Link
                href="/tv"
                className={`block px-4 py-2 text-sm ${
                  active
                    ? "bg-amber-500 text-white"
                    : "text-gray-900 dark:text-gray-200"
                }`}
              >
                TV
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <Link
                href="/about"
                className={`block px-4 py-2 text-sm ${
                  active
                    ? "bg-amber-500 text-white"
                    : "text-gray-900 dark:text-gray-200"
                }`}
              >
                About
              </Link>
            )}
          </MenuItem>
        </div>

        {/* Dark Mode Toggle */}
        <div className="p-2 border-t dark:border-gray-700">
          <MenuItem>{() => <DarkModeToggle />}</MenuItem>
        </div>

        {/* Profile or Sign In */}
        <div className="p-2 border-t dark:border-gray-700">
          <MenuItem>
            {({ active }) =>
              session?.user ? (
                <Link
                  href="/profile"
                  className={`block px-4 py-2 text-sm ${
                    active
                      ? "bg-amber-500 text-white"
                      : "text-gray-900 dark:text-gray-200"
                  }`}
                >
                  Profile
                </Link>
              ) : (
                <button
                  className={`block px-4 py-2 text-sm bg-amber-400 text-gray-900 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900`}
                >
                  Sign In
                </button>
              )
            }
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
