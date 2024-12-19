"use client";

export default function UserListControls({ onMoveUp, onMoveDown, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      {/* Move Up Button */}
      <button
        onClick={onMoveUp}
        disabled={!onMoveUp}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded hover:bg-gray-600 hover:text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        ↑
      </button>

      {/* Move Down Button */}
      <button
        onClick={onMoveDown}
        disabled={!onMoveDown}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded hover:bg-gray-600 hover:text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        ↓
      </button>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded hover:bg-red-600"
      >
        ✕
      </button>
    </div>
  );
}
