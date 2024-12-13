"use client";

export default function UserListSubmit({ userList, setUserList }) {
  const handleFinalize = () => {
    if (userList.length === 0) {
      alert("No movies in your list to finalize!");
      return;
    }

    const listText = userList
      .map((movie, index) => `${index + 1}. ${movie.title}`)
      .join("\n");
    alert(`Your finalized list:\n\n${listText}`);
  };

  const handleClear = () => {
    setUserList([]);
    localStorage.setItem("userList", "[]");
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleFinalize}
        disabled={userList.length === 0}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:bg-gray-400"
      >
        Finalize
      </button>
      <button
        onClick={handleClear}
        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-800"
      >
        Clear
      </button>
    </div>
  );
}
