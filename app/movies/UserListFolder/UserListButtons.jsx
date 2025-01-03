"use client";

import { useRouter } from "next/navigation";
import getGuestUserId from "@/utils/getGuestUserId";

export default function UserListButtons({ userList, setUserList }) {
  const router = useRouter();

  const handleFinalize = () => {
    if (userList.length === 0) {
      alert("No movies in your list to finalize!");
      return;
    }

    const listId = Math.random().toString(36).substring(2, 10);
    const userId = getGuestUserId();

    localStorage.setItem(
      `userList-${userId}-${listId}`,
      JSON.stringify(userList)
    );

    router.push(`/user/${userId}/movies/${listId}`);
  };

  const handleClear = () => {
    setUserList([]);
    localStorage.setItem("userList", "[]");
  };

  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={handleClear}
        className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 rounded hover:bg-red-500 hover:text-white dark:text-gray-100 dark:bg-gray-700 dark:hover:bg-red-600"
      >
        Clear
      </button>
      <button
        onClick={handleFinalize}
        disabled={userList.length === 0}
        className="px-4 py-2 text-sm font-medium text-gray-900 rounded bg-amber-400 hover:bg-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:text-gray-900 dark:bg-amber-500 dark:hover:bg-amber-600 dark:disabled:bg-gray-600"
      >
        Submit
      </button>
    </div>
  );
}
