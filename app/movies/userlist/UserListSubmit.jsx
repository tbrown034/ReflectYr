"use client";

export default function UserListSubmit({ userList }) {
  const handleFinalize = () => {
    if (userList.length === 0) {
      alert("No movies in your list to finalize!");
      return;
    }

    // Generate a numbered list for the alert
    const listText = userList
      .map((movie, index) => `${index + 1}. ${movie.title}`)
      .join("\n");

    alert(`Your finalized list:\n\n${listText}`);
  };

  return (
    <button
      onClick={handleFinalize}
      disabled={userList.length === 0}
      className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:bg-gray-400"
    >
      Finalize
    </button>
  );
}
