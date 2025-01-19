import Link from "next/link";
import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

const HeaderBrand = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 px-4 py-2 text-gray-900 transition rounded-xl dark:text-gray-100"
    >
      {/* Brand Name */}
      <h1 className="text-xl font-bold tracking-wide">
        <span className="text-amber-600 dark:text-amber-400">Reflect</span>
        <span className="text-gray-900 dark:text-gray-100">Yr</span>
      </h1>

      {/* Clock Icon */}
      <ClockIcon className="w-7 h-7 text-amber-500 dark:text-amber-400" />
    </Link>
  );
};

export default HeaderBrand;
