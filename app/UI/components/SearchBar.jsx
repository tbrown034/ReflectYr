"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term); // Update the query parameter
    } else {
      params.delete("query"); // Remove query if empty
    }

    params.set("page", "1"); // Reset pagination
    router.replace(`${pathname}?${params.toString()}`); // Update URL
  }, 300);

  return (
    <input
      type="text"
      placeholder="Search movies..."
      defaultValue={searchParams.get("query") || ""}
      onChange={(e) => handleSearch(e.target.value)}
      className="px-4 py-2 text-gray-900 placeholder-gray-700 bg-gray-200 border-2 border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
    />
  );
}
