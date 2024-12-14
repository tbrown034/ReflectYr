"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/app/UI/components/Modal";

export default function UserListButtons({ userList, setUserList }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalizeListId, setFinalizeListId] = useState(null);

  const handleFinalize = () => {
    if (userList.length === 0) {
      alert("No movies in your list to finalize!");
      return;
    }

    // Open the modal for confirmation
    setIsModalOpen(true);
  };

  const confirmFinalize = () => {
    // Generate a unique identifier for the list
    const listId = Math.random().toString(36).substring(2, 10); // Example: "abc123xyz"
    setFinalizeListId(listId);

    // Save the list to localStorage using the unique ID
    localStorage.setItem(`userList-${listId}`, JSON.stringify(userList));

    // Close the modal and navigate to the finalized list route
    setIsModalOpen(false);
    router.push(`/movies/userListId/${listId}`);
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmFinalize}
      >
        <h2 className="mb-2 text-lg font-bold">Confirm Finalization</h2>
        <p className="mb-4">
          {userList.length < 10
            ? "Your list has fewer than 10 movies. Are you sure you want to finalize it?"
            : "Are you ready to finalize your list?"}
        </p>
        <ol className="text-sm text-gray-700 list-decimal list-inside">
          {userList.map((movie, index) => (
            <li key={index}>{movie.title}</li>
          ))}
        </ol>
      </Modal>
    </div>
  );
}
