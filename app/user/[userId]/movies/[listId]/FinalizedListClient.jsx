"use client";

import { useEffect, useState } from "react";
import UserListControls from "@/app/movies/UserListFolder/UserListControls";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";

export default function FinalizedListClient({ userId, listId }) {
  const [movies, setMovies] = useState([]);
  const [userName, setUserName] = useState(""); // User's name (optional)
  const [listTitle, setListTitle] = useState("My Top Movies of 2024");
  const [isEditing, setIsEditing] = useState(false); // Tracks edit mode
  const router = useRouter();

  useEffect(() => {
    // Fetch the finalized list from localStorage
    const storedList = localStorage.getItem(`userList-${userId}-${listId}`);
    if (storedList) {
      setMovies(JSON.parse(storedList));
    } else {
      setMovies([]); // Fallback if no list is found
    }
  }, [userId, listId]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updatedList = [...movies];
    [updatedList[index - 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index - 1],
    ];
    setMovies(updatedList);
  };

  const moveDown = (index) => {
    if (index === movies.length - 1) return;
    const updatedList = [...movies];
    [updatedList[index + 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index + 1],
    ];
    setMovies(updatedList);
  };

  const removeMovie = (index) => {
    const updatedList = movies.filter((_, i) => i !== index);
    setMovies(updatedList);
  };

  const handleAddMore = () => {
    router.push("/movies");
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById("shareable-content");
    const canvas = await html2canvas(element, { scale: 2 });
    const link = document.createElement("a");
    link.download = "finalized-movie-list.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("shareable-content");
    const canvas = await html2canvas(element, { scale: 2 });
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("finalized-movie-list.pdf");
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-8 p-6 text-gray-100 bg-gray-900">
      {/* Add More Movies Button */}
      {movies.length < 10 && !isEditing && (
        <button
          onClick={handleAddMore}
          className="self-start px-6 py-3 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
        >
          Add More Movies
        </button>
      )}

      {/* Shareable Content */}
      <div
        id="shareable-content"
        className={`p-6 bg-gray-800 rounded-lg shadow-lg ${
          isEditing ? "border-4 border-red-500" : "border-4 border-gray-700"
        }`}
      >
        <h2 className="text-4xl font-bold text-center text-amber-400">
          {userName ? `${userName}'s` : "My"} Top Movies of 2024
        </h2>
        <ol className="mt-6 space-y-4">
          {movies.map((movie, index) => (
            <li
              key={index}
              className="flex items-start gap-4 px-4 py-2 text-lg bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <span className="text-2xl font-bold text-amber-400">
                {index + 1}.
              </span>
              <span className="flex-1 font-medium text-gray-100">
                {movie.title}
              </span>
              {isEditing && (
                <UserListControls
                  onMoveUp={() => moveUp(index)}
                  onMoveDown={() => moveDown(index)}
                  onRemove={() => removeMovie(index)}
                />
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Edit / Finalize Button */}
      <div className="flex gap-4">
        {!isEditing ? (
          <button
            onClick={toggleEditMode}
            className="px-6 py-3 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
          >
            Edit List
          </button>
        ) : (
          <button
            onClick={toggleEditMode}
            className="px-6 py-3 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
          >
            Finalize List
          </button>
        )}
      </div>

      {/* Share Options */}
      {!isEditing && (
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handleDownloadImage}
            className="px-6 py-3 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-800"
          >
            Download as Image
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-800"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
