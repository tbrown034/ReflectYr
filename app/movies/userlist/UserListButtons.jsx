"use client";

import { useRouter } from "next/navigation";

export default function UserListButtons({ userList, setUserList }) {
  const router = useRouter();

  const handleFinalize = () => {
    if (userList.length === 0) {
      alert("No movies in your list to finalize!");
      return;
    }

    // Generate a unique ID for the finalized list
    const listId = Math.random().toString(36).substring(2, 10); // e.g., "rt1dyw8u"

    // Save the list to localStorage
    localStorage.setItem(`userList-${listId}`, JSON.stringify(userList));

    // Navigate to the new dynamic route
    router.push(`/movies/${listId}`);
  };

  const handleClear = () => {
    setUserList([]);
    localStorage.setItem("userList", "[]");
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={handleFinalize}
        disabled={userList.length === 0}
        className="px-4 py-2 transition border-2 border-black rounded hover:bg-black hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Finalize
      </button>
      <button
        onClick={handleClear}
        className="px-4 py-2 transition border-2 border-black rounded hover:bg-red-600 hover:text-white"
      >
        Clear
      </button>
    </div>
  );
}
