// Location: app/UI/components/SearchBar.jsx
// Type: Client Component
// Purpose: Allows users to search for movies by dynamically updating the URL with the search query.

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
      className="px-4 py-2 border rounded"
    />
  );
}
