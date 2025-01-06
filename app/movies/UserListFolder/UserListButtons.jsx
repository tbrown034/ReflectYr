"use client";

import { useRouter } from "next/navigation";

export default function UserListButtons({ userList, setUserList }) {
  const router = useRouter();

  const handleFinalize = () => {
    if (userList.length === 0) {
      alert("No movies in your list to finalize!");
      return;
    }

    // Generate a unique temporary list ID
    const temporaryListId = Math.random().toString(36).substring(2, 10);

    // Save the list in localStorage using the temporaryListId
    localStorage.setItem(
      `temporaryList-${temporaryListId}`,
      JSON.stringify(userList)
    );

    // Redirect to the dynamic temp-list route with the temporaryListId
    router.push(`/temp-list/${temporaryListId}`);
  };

  const handleClear = () => {
    // Clear the list in local state
    setUserList([]);

    // Clear all temporary list data from localStorage
    localStorage.setItem("userList", "[]");
  };

  return (
    <div className="flex justify-between mt-6">
      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 rounded-lg hover:bg-red-500 hover:text-white dark:text-gray-100 dark:bg-gray-700 dark:hover:bg-red-600"
        aria-label="Clear list"
      >
        Clear
      </button>

      {/* Submit Button */}
      <button
        onClick={handleFinalize}
        disabled={userList.length === 0}
        className="px-4 py-2 text-sm font-medium text-gray-900 rounded-lg bg-amber-400 hover:bg-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:text-gray-900 dark:bg-amber-500 dark:hover:bg-amber-600 dark:disabled:bg-gray-600"
        aria-label="Submit list"
      >
        Submit
      </button>
    </div>
  );
}
