"use client";

import { useState, useEffect, useRef } from "react";
// Import your helper to format the date
import { formatDate } from "@/app/helpers/dateHelpers"; // adjust path as needed

export default function Title({
  listTitle,
  onTitleChange,
  isTitleEditing,
  setIsTitleEditing,
}) {
  // Local "draft" state for the title while editing
  const [tempTitle, setTempTitle] = useState(listTitle);

  // Ref to track if the Cancel button was clicked
  const cancelClickedRef = useRef(false);

  // On entering edit mode, reset tempTitle to the current parent's title
  useEffect(() => {
    if (isTitleEditing) {
      setTempTitle(listTitle);
    }
  }, [isTitleEditing, listTitle]);

  // If NOT editing, show the title, created date, and "Edit Title" button
  if (!isTitleEditing) {
    // If you want to display a constant date from the DB, pass it as a prop.
    // Otherwise, we just show "today" for demonstration:
    const createdOn = formatDate(new Date());

    return (
      <div className="text-center">
        <h1 className="text-2xl font-extrabold md:text-4xl text-amber-600 dark:text-amber-400 drop-shadow-md">
          {listTitle}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Created on {createdOn}
        </p>

        <button
          onClick={() => setIsTitleEditing(true)}
          className="px-3 py-1 mt-2 text-sm font-semibold text-gray-900 rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
        >
          Edit Title
        </button>
      </div>
    );
  }

  // If editing, show input + "Save Title" / "Cancel"
  return (
    <div className="flex flex-col items-center w-full max-w-2xl gap-2 mx-auto">
      <input
        value={tempTitle}
        onChange={(e) => setTempTitle(e.target.value)}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            // Save new title & exit edit mode
            onTitleChange(tempTitle);
            setIsTitleEditing(false);
          }
        }}
        onBlur={() => {
          if (!cancelClickedRef.current) {
            // Save on blur if Cancel wasn't clicked
            onTitleChange(tempTitle);
            setIsTitleEditing(false);
          }
          // Reset the ref for future edits
          cancelClickedRef.current = false;
        }}
        className="w-full p-2 text-lg font-bold text-center text-black border-2 border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        placeholder="Enter a title"
      />

      <div className="flex gap-2">
        <button
          onClick={() => {
            onTitleChange(tempTitle);
            setIsTitleEditing(false);
          }}
          className="px-4 py-2 text-sm font-semibold text-gray-900 rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
        >
          Save Title
        </button>

        <button
          onMouseDown={() => {
            // Set the ref to true to indicate Cancel was clicked before onBlur
            cancelClickedRef.current = true;
          }}
          onClick={() => {
            // Cancel => revert without saving
            setIsTitleEditing(false);
          }}
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
