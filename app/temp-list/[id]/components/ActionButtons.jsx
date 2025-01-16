export default function ActionButtons({
  isEditing,
  onEditToggle,
  onAddMore,
  onSaveList,
  onDownloadImage,
  showSaveList,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
      <button
        onClick={onAddMore}
        className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
      >
        Add More Movies
      </button>
      <button
        onClick={onEditToggle}
        className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
      >
        {isEditing ? "Finalize Edits" : "Edit"}
      </button>
      {showSaveList && (
        <button
          onClick={onSaveList}
          className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Save List
        </button>
      )}
      <button
        onClick={onDownloadImage}
        className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Share List
      </button>
    </div>
  );
}
