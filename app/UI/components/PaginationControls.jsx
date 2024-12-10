// Location: app/UI/components/PaginationControls.jsx
// Type: Client Component
// Purpose: Provides pagination controls to navigate through movie pages.

"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationControls({ currentPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        className="px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        className="px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
