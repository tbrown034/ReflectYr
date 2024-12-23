"use client";

import { useEffect, useState } from "react";
import UserListControls from "@/app/movies/UserListFolder/UserListControls";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true, // Ensure CORS is enabled to load images properly
      allowTaint: false,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = "finalized-movie-list.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 p-6 text-gray-100 bg-gray-900">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-amber-400 sm:text-4xl">
        {userName ? `${userName}'s` : ""} {listTitle}
      </h1>

      {/* Shareable Content */}
      <div
        id="shareable-content"
        className="w-full max-w-3xl p-4 bg-gray-800 border-4 border-gray-700 rounded-lg shadow-lg"
      >
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {movies.map((movie, index) => (
            <li
              key={index}
              className="transition-all duration-200 bg-gray-900 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-700"
            >
              <Link
                href={`/movies/${movie.id}`}
                className="flex items-center gap-4 p-4"
              >
                {/* Number */}
                <span className="text-2xl font-bold text-gray-400">
                  {index + 1}.
                </span>

                {/* Poster */}
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={60}
                  height={90}
                  className="rounded-md shadow-md"
                />

                {/* Title */}
                <p className="flex-1 text-sm font-semibold text-gray-100 sm:text-lg">
                  {movie.title}
                </p>
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
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        {/* Add More Movies */}
        {movies.length < 10 && !isEditing && (
          <button
            onClick={handleAddMore}
            className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
          >
            Add More Movies
          </button>
        )}

        {/* Edit/Finalize Buttons */}
        {!isEditing ? (
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
          >
            Edit List
          </button>
        ) : (
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
          >
            Finalize List
          </button>
        )}

        {/* Download Image Button */}
        <button
          onClick={handleDownloadImage}
          className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-800"
        >
          Download as Image
        </button>
      </div>
    </div>
  );
}
