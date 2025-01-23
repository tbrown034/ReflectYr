"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddToListClient({ movie }) {
  const router = useRouter();
  const [isInUserList, setIsInUserList] = useState(false);

  useEffect(() => {
    const userList = JSON.parse(localStorage.getItem("userList") || "[]");
    setIsInUserList(userList.some((m) => m.id === movie.id));
  }, [movie.id]);

  const handleAddToList = () => {
    if (isInUserList) return;

    const currentList = JSON.parse(localStorage.getItem("userList") || "[]");
    localStorage.setItem("userList", JSON.stringify([...currentList, movie]));
    router.push("/movies");
  };

  return (
    <button
      onClick={handleAddToList}
      disabled={isInUserList}
      className={`w-full px-6 py-3 text-lg font-medium rounded-lg transition ${
        isInUserList
          ? "bg-gray-400 text-gray-100 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-800"
      }`}
    >
      {isInUserList ? "Already in List" : "Add to List"}
    </button>
  );
}
