"use client";

import {
  ArrowUpIcon,
  ArrowDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function UserListControls({ onMoveUp, onMoveDown, onRemove }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border-opacity-10 sm:gap-4">
      {/* Move Up Button */}
      <button
        onClick={onMoveUp}
        disabled={!onMoveUp}
        title="Move Up"
        aria-label="Move Up"
        className="px-3 py-2 text-sm font-medium text-gray-900 transition bg-gray-300 rounded-lg hover:bg-amber-400 hover:text-gray-900 disabled:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-amber-500 dark:hover:text-gray-900 dark:disabled:bg-gray-500"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>

      {/* Move Down Button */}
      <button
        onClick={onMoveDown}
        disabled={!onMoveDown}
        title="Move Down"
        aria-label="Move Down"
        className="px-3 py-2 text-sm font-medium text-gray-900 transition bg-gray-300 rounded-lg hover:bg-amber-400 hover:text-gray-900 disabled:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-amber-500 dark:hover:text-gray-900 dark:disabled:bg-gray-600"
      >
        <ArrowDownIcon className="w-5 h-5" />
      </button>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        title="Remove"
        aria-label="Remove"
        className="px-3 py-2 text-sm font-medium text-gray-900 transition bg-gray-300 rounded-lg hover:bg-red-500 hover:text-white dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-red-600 dark:hover:text-white"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
