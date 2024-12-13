"use client";

export default function AddToListButton({ movie, onAdd, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      onAdd();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`px-4 py-2 text-white rounded ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-800"
      }`}
    >
      {disabled ? "Added" : "Add to List"}
    </button>
  );
}
