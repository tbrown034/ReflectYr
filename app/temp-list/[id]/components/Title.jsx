export default function Title({ listTitle, isEditing, onTitleChange, onSave }) {
  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={listTitle}
          onChange={onTitleChange}
          className="w-full p-3 text-2xl font-bold text-center text-black transition-all duration-300 border-2 rounded-lg shadow-sm focus:border-amber-500 focus:outline-none"
        />
        <button
          onClick={onSave}
          className="w-full px-4 py-2 mt-2 text-lg font-semibold text-gray-900 transition rounded-lg bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
        >
          Save Title
        </button>
      </div>
    );
  }

  return (
    <h1 className="text-4xl font-extrabold text-center text-amber-600 sm:text-5xl dark:text-amber-400 drop-shadow-md">
      {listTitle}
    </h1>
  );
}
