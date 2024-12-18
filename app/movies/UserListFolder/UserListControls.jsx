"use client";

export default function UserListControls({ onMoveUp, onMoveDown, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onMoveUp}
        disabled={!onMoveUp}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:bg-gray-400"
      >
        Move Up
      </button>
      <button
        onClick={onMoveDown}
        disabled={!onMoveDown}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:bg-gray-400"
      >
        Move Down
      </button>
      <button
        onClick={onRemove}
        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-800"
      >
        Remove
      </button>
    </div>
  );
}
