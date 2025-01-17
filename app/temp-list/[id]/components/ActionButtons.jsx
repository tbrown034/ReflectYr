"use client";

import { useState } from "react";
import AlertDialog from "../../../UI/components/AlertDialog";

export default function ActionButtons({
  isEditing,
  onEditToggle,
  onAddMore,
  onSaveList,
  onDownloadImage,
  showSaveList,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog
  const [dialogData, setDialogData] = useState({
    title: "",
    message: "",
  });

  const handleSaveList = async () => {
    try {
      await onSaveList(); // Call the parent function for saving the list
      setDialogData({
        title: "Success!",
        message: "Your list has been saved successfully.",
      });
    } catch (error) {
      setDialogData({
        title: "Error!",
        message: "Failed to save your list. Please try again.",
      });
    } finally {
      setIsDialogOpen(true); // Open the dialog
    }
  };

  const handleDownloadImage = async () => {
    try {
      await onDownloadImage(); // Call the parent function for downloading the image
      setDialogData({
        title: "Success!",
        message: "The image has been downloaded successfully.",
      });
    } catch (error) {
      setDialogData({
        title: "Error!",
        message: "Failed to download the image. Please try again.",
      });
    } finally {
      setIsDialogOpen(true); // Open the dialog
    }
  };

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
          onClick={handleSaveList}
          className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Save List
        </button>
      )}
      <button
        onClick={handleDownloadImage}
        className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Share List
      </button>

      {/* AlertDialog for Success/Fail Messages */}
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)} // Close dialog handler
        title={dialogData.title}
        message={dialogData.message}
      />
    </div>
  );
}
