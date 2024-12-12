"use client";

export default function AddToListButton({ movie, onAdd }) {
  const handleClick = () => {
    onAdd(); // Call the onAdd function passed as a prop
  };

  return (
    <button
      className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
      onClick={handleClick}
    >
      Add to List
    </button>
  );
}
