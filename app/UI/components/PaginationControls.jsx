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
    <div className="flex items-center justify-between mt-6">
      <button
        className="px-4 py-2 text-sm font-medium text-gray-900 rounded-lg bg-amber-400 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span className="text-gray-100">Page {currentPage}</span>
      <button
        className="px-4 py-2 text-sm font-medium text-gray-900 rounded-lg bg-amber-400 hover:bg-amber-500"
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
