"use client";

import React, { useEffect } from "react";
import YearPicker from "../components/YearPicker";
import { useYear } from "@/app/context/YearContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const YearHolder = () => {
  const { selectedYear } = useYear();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the current "year" parameter from the URL, default to "2025"
  const currentYearParam = searchParams.get("year") || "2025";

  useEffect(() => {
    // If the selected year isn't the same as the URL's, update the URL.
    if (selectedYear.toString() !== currentYearParam) {
      router.push(`${pathname}?year=${selectedYear}`);
    }
  }, [selectedYear, currentYearParam, pathname, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 bg-gray-800 rounded-lg shadow-md">
      {/* Title */}
      <h1 className="text-2xl font-extrabold text-gray-100">
        Select Your Year
      </h1>

      {/* Description */}
      <p className="max-w-lg text-sm text-center text-gray-400">
        Want to make your top ten list for this, last year, or whenever? Choose
        a year below to get started!
      </p>

      {/* Year Picker */}
      <YearPicker />

      {/* Create List Button */}
      <Link
        href={`/movies?year=${selectedYear}`}
        className="inline-flex items-center gap-2 px-4 py-2 text-lg font-semibold text-gray-900 transition border-2 border-transparent rounded-lg shadow-lg bg-amber-400 hover:bg-amber-500 hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create List for {selectedYear}
      </Link>
    </div>
  );
};

export default YearHolder;
