"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function AlertDialog({ isOpen, onClose, title, message }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div className="relative max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <Dialog.Title className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {title}
        </Dialog.Title>
        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {message}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      </div>
    </Dialog>
  );
}
