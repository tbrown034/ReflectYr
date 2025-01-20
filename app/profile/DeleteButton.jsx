"use client";

const DeleteButton = ({ listId, deleteList }) => {
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
          deleteList(listId);
        } else {
          const error = await response.text();
          console.error("Failed to delete list:", error);
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
      className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
    >
      Delete List
    </button>
  );
};

export default DeleteButton;
