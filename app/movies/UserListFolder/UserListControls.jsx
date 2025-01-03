"use client";

export default function UserListControls({ onMoveUp, onMoveDown, onRemove }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {/* Move Up Button */}
      <button
        onClick={onMoveUp}
        disabled={!onMoveUp}
        className="px-3 py-2 text-sm font-medium text-gray-900 transition bg-gray-300 rounded-lg hover:bg-amber-400 hover:text-gray-900 disabled:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-amber-500 dark:hover:text-gray-900 dark:disabled:bg-gray-600"
        title="Move Up"
      >
        ↑
      </button>

      {/* Move Down Button */}
      <button
        onClick={onMoveDown}
        disabled={!onMoveDown}
        className="px-3 py-2 text-sm font-medium text-gray-900 transition bg-gray-300 rounded-lg hover:bg-amber-400 hover:text-gray-900 disabled:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-amber-500 dark:hover:text-gray-900 dark:disabled:bg-gray-600"
        title="Move Down"
      >
        ↓
      </button>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="px-3 py-2 text-sm font-medium text-gray-900 transition bg-gray-300 rounded-lg hover:bg-red-500 hover:text-white dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-red-600 dark:hover:text-white"
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
}
