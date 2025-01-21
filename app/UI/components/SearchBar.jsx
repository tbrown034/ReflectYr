"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract the existing query from the URL if present
  const [term, setTerm] = useState(searchParams.get("query") || "");

  // Debounced function to handle search
  const handleSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("query", value); // Update the query parameter
    } else {
      params.delete("query"); // Remove query if empty
    }

    params.set("page", "1"); // Reset pagination when searching
    router.replace(`${pathname}?${params.toString()}`); // Update the URL
  }, 300);

  // Handle input change
  const handleChange = (value) => {
    setTerm(value); // Update local state for input value
    handleSearch(value); // Trigger debounced search
  };

  // Clear the search input
  const clearSearch = () => {
    setTerm(""); // Reset local state
    handleSearch(""); // Update the URL by removing the query
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search movies..."
        value={term}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-2 text-gray-900 placeholder-gray-700 bg-gray-200 border-2 border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />

      {/* Clear Button */}
      {term && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 flex items-center px-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-full right-2 hover:text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-100 focus:outline-none"
        >
          Clear
        </button>
      )}
    </div>
  );
}
