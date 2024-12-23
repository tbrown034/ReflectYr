"use client";

import { useEffect, useState } from "react";
import UserListControls from "@/app/movies/UserListFolder/UserListControls";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FinalizedListClient({ userId, listId }) {
  const [movies, setMovies] = useState([]);
  const [userName, setUserName] = useState(""); // User's name (optional)
  const [listTitle, setListTitle] = useState("My Top Movies of 2024");
  const [isEditing, setIsEditing] = useState(false); // Tracks edit mode
  const router = useRouter();

  useEffect(() => {
    const storedList = localStorage.getItem(`userList-${userId}-${listId}`);
    if (storedList) {
      setMovies(JSON.parse(storedList));
    }
  }, [userId, listId]);

  const toggleEditMode = () => setIsEditing(!isEditing);

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
    setMovies(movies.filter((_, i) => i !== index));
  };

  const handleAddMore = () => router.push("/movies");

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
    <div className="flex flex-col items-center min-h-screen gap-6 p-6 text-gray-100 bg-gray-900">
      {/* Shareable Content */}
      <div
        id="shareable-content"
        className="w-full max-w-3xl p-4 bg-gray-800 border-4 border-gray-700 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-amber-400 sm:text-4xl">
          {userName ? `${userName}'s` : ""} {listTitle}
        </h2>
        <ul className="mt-6 space-y-4">
          {movies.map((movie, index) => (
            <li
              key={index}
              className="transition-all duration-200 bg-gray-900 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-700"
            >
              <Link
                href={`/movies/${movie.id}`}
                className="flex items-center justify-between gap-4 p-4"
              >
                {/* Left Section: Number, Poster, Title */}
                <div className="flex items-center gap-4">
                  {/* Number */}
                  <span className="text-lg font-bold text-gray-400">
                    {index + 1}.
                  </span>

                  {/* Poster */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[80px] h-[120px] rounded-md shadow-md"
                  />

                  {/* Title */}
                  <p className="text-sm font-semibold text-gray-100 sm:text-lg">
                    {movie.title}
                  </p>
                </div>
              </Link>

              {/* Edit Controls */}
              {isEditing && (
                <div className="flex items-center gap-2 p-4 sm:gap-4">
                  <UserListControls
                    onMoveUp={index > 0 ? () => moveUp(index) : null}
                    onMoveDown={
                      index < movies.length - 1 ? () => moveDown(index) : null
                    }
                    onRemove={() => removeMovie(index)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Buttons: Add More Movies and Edit List */}
        <div className="flex justify-between mt-4 sm:justify-start sm:gap-4">
          {/* Add More Movies */}
          {movies.length < 10 && !isEditing && (
            <button
              onClick={handleAddMore}
              className="p-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
            >
              Add More Movies
            </button>
          )}

          {/* Edit List */}
          {!isEditing ? (
            <button
              onClick={toggleEditMode}
              className="p-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
            >
              Edit List
            </button>
          ) : (
            <button
              onClick={toggleEditMode}
              className="p-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
            >
              Finalize List
            </button>
          )}
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex items-center gap-4 sm:flex-row">
        <button
          onClick={handleDownloadImage}
          className="p-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-800"
        >
          Download as Image
        </button>
        <button
          onClick={handleDownloadPDF}
          className="p-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-800"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}
