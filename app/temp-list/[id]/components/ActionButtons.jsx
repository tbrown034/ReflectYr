"use client";

import { handleClear } from "@/app/helpers/listHelpers";

export default function ActionButtons({
  router,
  isListEditing,
  setIsListEditing,
  allowSave,
  handleSaveList,
  handleClearList,
  movies,
  setMovies,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        onClick={() => router.push("/movies")}
        className="px-4 py-2 text-sm font-semibold text-gray-900 rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
      >
        Add More Movies
      </button>

      {/* Toggle only the list editing (not title editing) */}
      <button
        onClick={() => setIsListEditing(!isListEditing)}
        className="px-4 py-2 text-sm font-semibold text-gray-900 rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
      >
        {isListEditing ? "Finish Editing" : "Edit List"}
      </button>

      {/* Save List (only appears if user is logged in => allowSave = true) */}
      {allowSave && (
        <button
          onClick={handleSaveList}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Save List
        </button>
      )}

      {/* Clear Entire List */}
      <button
        onClick={handleClearList}
        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Clear List
      </button>
    </div>
  );
}
