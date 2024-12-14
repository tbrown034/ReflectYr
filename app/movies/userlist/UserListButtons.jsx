"use client";

export default function UserListButtons({ userList, setUserList }) {
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
