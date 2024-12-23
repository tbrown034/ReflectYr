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
      className={` p-2 text-sm  border-gray-600 border-2  rounded-xl text-center transition ${
        disabled
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-amber-400 text-gray-900 hover:bg-amber-500"
      }`}
    >
      {disabled ? "Added" : "Add"}
    </button>
  );
}
