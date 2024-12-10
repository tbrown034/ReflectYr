// Location: app/movies/components/UserListControls.jsx
// Type: Client Component
// Purpose: Provides controls to reorder or remove items in the user's list.

"use client";

import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function UserListControls({ onMoveUp, onMoveDown, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onMoveUp}
        disabled={!onMoveUp}
        className="p-1 text-green-800 transition hover:text-green-950 disabled:text-gray-500"
      >
        <ChevronUpIcon className="w-6 h-6 hover:scale-110" />
      </button>
      <button
        onClick={onMoveDown}
        disabled={!onMoveDown}
        className="p-1 text-yellow-700 transition hover:text-yellow-950 disabled:text-gray-500"
      >
        <ChevronDownIcon className="w-6 h-6 hover:scale-110" />
      </button>
      <button
        onClick={onRemove}
        className="p-1 text-red-800 transition hover:text-red-950"
      >
        <XMarkIcon className="w-6 h-6 hover:scale-110" />
      </button>
    </div>
  );
}
