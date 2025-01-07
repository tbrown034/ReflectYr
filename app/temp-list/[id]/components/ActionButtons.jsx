export default function ActionButtons({
  isEditing,
  isTitleEditing,
  onAddMore,
  onEditList,
  onFinalizeList,
  onEditTitle,
  onSaveList,
  onDownloadImage,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
      <button
        onClick={onAddMore}
        className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
      >
        Add More Movies
      </button>
      {!isEditing ? (
        <button
          onClick={onEditList}
          className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
        >
          Edit List
        </button>
      ) : (
        <button
          onClick={onFinalizeList}
          className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
        >
          Finalize List
        </button>
      )}
      <button
        onClick={onEditTitle}
        className={`px-4 py-2 text-sm font-semibold transition rounded ${
          isTitleEditing
            ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
            : "bg-amber-400 text-gray-900 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600"
        }`}
        disabled={isTitleEditing}
      >
        Edit Title
      </button>
      <button
        onClick={onSaveList}
        className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Save List
      </button>
      <button
        onClick={onDownloadImage}
        className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Download as Image
      </button>
    </div>
  );
}
