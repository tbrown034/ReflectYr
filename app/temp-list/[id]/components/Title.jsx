"use client";

export default function Title({ listTitle, isEditing, onTitleChange }) {
  return isEditing ? (
    <div className="flex flex-col items-center">
      <input
        value={listTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full p-2 text-lg font-bold text-center text-black border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-amber-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        placeholder="Enter a title"
      />
    </div>
  ) : (
    <h1 className="text-2xl font-extrabold text-center md:text-4xl text-amber-600 dark:text-amber-400 drop-shadow-md">
      {listTitle}
    </h1>
  );
}
