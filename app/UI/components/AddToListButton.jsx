"use client";

export default function AddToListButton({ onAdd, disabled }) {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevents the click from affecting the parent Link
    if (!disabled) {
      onAdd();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`px-4 p-2 border-gray-600 border-2 rounded-xl text-center transition ${
        disabled
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-amber-400 text-gray-900 hover:bg-amber-500"
      }`}
    >
      {disabled ? "Added" : "Add"}
    </button>
  );
}
