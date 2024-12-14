"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddToListClient({ movie }) {
  const router = useRouter();

  // State to track if the movie is already in the list
  const [isInUserList, setIsInUserList] = useState(false);

  // Check if the movie is already in the user list on mount
  useEffect(() => {
    const userList = JSON.parse(localStorage.getItem("userList") || "[]");
    setIsInUserList(userList.some((m) => m.id === movie.id));
  }, [movie.id]);

  const handleAddToList = () => {
    if (isInUserList) return;

    // Retrieve the current list from localStorage
    const currentList = JSON.parse(localStorage.getItem("userList") || "[]");

    // Add the movie to the list and save to localStorage
    localStorage.setItem("userList", JSON.stringify([...currentList, movie]));

    // Navigate back to /movies
    router.push("/movies");
  };

  return (
    <button
      onClick={handleAddToList}
      disabled={isInUserList}
      className={`px-4 py-2 text-white rounded ${
        isInUserList
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-800"
      }`}
    >
      {isInUserList ? "Added" : "Add to List"}
    </button>
  );
}
