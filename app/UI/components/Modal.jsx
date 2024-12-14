// "use client";

// export default function Modal({ isOpen, onCancel, onConfirm, children }) {
//   if (!isOpen) return null; // Don't render if the modal is not open

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-full max-w-md p-6 bg-white rounded-md shadow-lg">
//         <div className="mb-4">{children}</div>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onCancel} // Close modal
//             className="px-4 py-2 text-sm font-medium text-gray-700 border rounded hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm} // Confirm and execute action
//             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-800"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
