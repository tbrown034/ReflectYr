"use client";

import { useEffect, useState } from "react";
import UserListControls from "@/app/movies/UserList/UserListControls";
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
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <h1 className={` ${isEditing ? "text-red-600" : "text-gray-900"}`}>
        {isEditing
          ? "Edit Mode"
          : `${userName ? `${userName}'s` : "My"} Top Movies of 2024`}
      </h1>

      {/* Add More Movies */}
      {movies.length < 10 && !isEditing && (
        <button
          onClick={handleAddMore}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 w-fit"
        >
          Add More Movies
        </button>
      )}

      {/* Movie List */}
      <div
        id="shareable-content"
        className={`p-4 border rounded shadow-lg ${
          isEditing ? "border-red-500" : "border-gray-300"
        }`}
      >
        <ol className="list-decimal list-inside">
          {movies.map((movie, index) => (
            <li key={index} className="flex items-center justify-between py-2">
              <span>{movie.title}</span>
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
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Edit List
          </button>
        ) : (
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Finalize List
          </button>
        )}
      </div>

      {/* Share Options */}
      {!isEditing && (
        <div className="flex gap-4">
          <button
            onClick={handleDownloadImage}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800"
          >
            Download as Image
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
