"use client";

export default function AddToListButton({ onAdd, disabled }) {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default navigation behavior
    e.stopPropagation(); // Prevent event bubbling to the parent Link
    if (!disabled) {
      onAdd();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`px-3 p-2 border-gray-600 border-2 rounded-xl text-center transition ${
        disabled
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-amber-400 text-gray-900 hover:bg-amber-500"
      }`}
    >
      {disabled ? "Added" : "Add"}
    </button>
  );
}
