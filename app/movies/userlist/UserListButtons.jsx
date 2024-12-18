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

    // Generate a unique ID for the finalized list
    const listId = Math.random().toString(36).substring(2, 10);

    // Get or generate a guest user ID
    const userId = getGuestUserId();

    // Save the list to localStorage
    localStorage.setItem(
      `userList-${userId}-${listId}`,
      JSON.stringify(userList)
    );

    // Navigate to the finalized list route
    router.push(`/user/${userId}/movies/${listId}`);
  };

  const handleClear = () => {
    setUserList([]);
    localStorage.setItem("userList", "[]");
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={handleClear}
        className="px-4 py-2 border-2 border-black rounded hover:bg-red-600 hover:text-white"
      >
        Clear
      </button>
      <button
        onClick={handleFinalize}
        disabled={userList.length === 0}
        className="px-4 py-2 border-2 border-black rounded hover:bg-black hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </div>
  );
}
