"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";

const DeleteButton = ({ listId }) => {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this list?")) {
      try {
        const response = await fetch(`/api/delete-list`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listId }),
        });

        if (response.ok) {
          alert("List deleted successfully.");
          // Refresh the page after deletion
          location.reload();
        } else {
          alert("Failed to delete the list.");
        }
      } catch (error) {
        console.error("Error deleting list:", error);
        alert("An error occurred while deleting the list.");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="absolute text-red-400 top-2 right-2 hover:text-red-600"
      aria-label="Delete"
    >
      <XCircleIcon className="w-6 h-6" />
    </button>
  );
};

export default DeleteButton;
