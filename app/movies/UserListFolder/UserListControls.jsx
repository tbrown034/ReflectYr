"use client";

export default function UserListControls({ onMoveUp, onMoveDown, onRemove }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {/* Move Up Button */}
      <button
        onClick={onMoveUp}
        disabled={!onMoveUp}
        className="px-3 py-2 text-sm font-medium text-gray-300 transition duration-200 bg-gray-700 rounded-lg hover:bg-amber-500 hover:text-gray-900 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Move Up"
      >
        ↑
      </button>

      {/* Move Down Button */}
      <button
        onClick={onMoveDown}
        disabled={!onMoveDown}
        className="px-3 py-2 text-sm font-medium text-gray-300 transition duration-200 bg-gray-700 rounded-lg hover:bg-amber-500 hover:text-gray-900 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Move Down"
      >
        ↓
      </button>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="px-3 py-2 text-sm font-medium text-gray-300 transition duration-200 bg-gray-700 rounded-lg hover:bg-red-600 hover:text-white"
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
}
