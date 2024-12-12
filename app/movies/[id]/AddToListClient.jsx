"use client";

import { useRouter } from "next/navigation";

export default function AddToListClient({ movie }) {
  const router = useRouter();

  const handleAddToList = () => {
    // Retrieve the current list from localStorage
    const currentList = JSON.parse(localStorage.getItem("userList") || "[]");

    // Prevent adding duplicates
    if (!currentList.some((m) => m.id === movie.id)) {
      localStorage.setItem("userList", JSON.stringify([...currentList, movie]));
    }

    // Navigate back to /movies
    router.push("/movies");
  };

  return (
    <button
      onClick={handleAddToList}
      className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Add to List
    </button>
  );
}
