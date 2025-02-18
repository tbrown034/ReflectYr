"use client";

import { useRouter } from "next/navigation";
import { handleFinalize, handleClear } from "@/app/helpers/listHelpers"; // Import helper functions

export default function UserListButtons({ userList, setUserList }) {
  const router = useRouter();

  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={() => handleClear(setUserList)}
        className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 rounded-lg hover:bg-red-500 hover:text-white dark:text-gray-100 dark:bg-gray-700 dark:hover:bg-red-600"
        aria-label="Clear list"
      >
        Clear
      </button>
      <button
        onClick={() => handleFinalize(userList, router)}
        disabled={userList.length === 0}
        className="px-4 py-2 text-sm font-medium text-gray-900 rounded-lg bg-amber-400 hover:bg-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:text-gray-900 dark:bg-amber-500 dark:hover:bg-amber-600 dark:disabled:bg-gray-600"
        aria-label="Submit list"
      >
        Submit
      </button>
    </div>
  );
}
