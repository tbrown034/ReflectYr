export default function Title({ listTitle, isEditing, onTitleChange, onSave }) {
  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={listTitle}
          onChange={onTitleChange}
          className="w-full p-2 text-sm font-bold text-center text-black border-2 rounded-lg shadow-sm focus:border-amber-500 focus:outline-none"
        />
        <button
          onClick={onSave}
          className="w-full px-4 py-2 mt-2 text-sm font-semibold text-gray-900 transition rounded-lg bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
        >
          Save Title
        </button>
      </div>
    );
  }

  return (
    <h1 className="text-2xl font-extrabold text-center md:text-4xl text-amber-600 dark:text-amber-400 drop-shadow-md">
      {listTitle}
    </h1>
  );
}
