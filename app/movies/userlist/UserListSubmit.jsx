"use client";

import { useRouter } from "next/navigation";

export default function UserListSubmit({ userList }) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the new route with the user's list
    const encodedList = encodeURIComponent(JSON.stringify(userList));
    router.push(`/movies/userlist?data=${encodedList}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={userList.length === 0} // Disable if userList is empty
      className={`w-full px-4 py-2 mt-4 text-white rounded ${
        userList.length === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-800"
      }`}
    >
      Finalize
    </button>
  );
}
