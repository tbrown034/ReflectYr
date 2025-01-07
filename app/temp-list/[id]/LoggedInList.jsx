"use client";

import { useState, useEffect } from "react";
import UserListControls from "@/app/movies/UserListFolder/UserListControls";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoggedInList({ temporaryListId, userName }) {
  const [movies, setMovies] = useState([]);
  const [listTitle, setListTitle] = useState(
    `${userName}'s Top Movies of 2024`
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const router = useRouter();

  // Load the list from localStorage using the temporaryListId
  useEffect(() => {
    if (temporaryListId) {
      const storedList = localStorage.getItem(
        `temporaryList-${temporaryListId}`
      );
      if (storedList) {
        try {
          setMovies(JSON.parse(storedList));
        } catch (error) {
          console.error("Error parsing stored list:", error);
        }
      } else {
        console.warn(`No list found for temporaryListId: ${temporaryListId}`);
      }
    }
  }, [temporaryListId]);

  const toggleEditMode = () => setIsEditing(!isEditing);

  const toggleTitleEditMode = () => {
    setIsTitleEditing(true); // Enable title editing
  };

  const handleTitleChange = (event) => {
    setListTitle(event.target.value);
  };

  const saveTitle = () => {
    setIsTitleEditing(false); // Disable title editing
    console.log("Title Saved:", listTitle);
    // Optionally, save the updated title to localStorage or a backend
  };

  const saveToDatabase = () => {
    console.log("List Title:", listTitle);
    console.log("Movies List:", movies);
    // Add your logic to save the list to the database here
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updatedList = [...movies];
    [updatedList[index - 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index - 1],
    ];
    setMovies(updatedList);
    localStorage.setItem(
      `temporaryList-${temporaryListId}`,
      JSON.stringify(updatedList)
    );
  };

  const moveDown = (index) => {
    if (index === movies.length - 1) return;
    const updatedList = [...movies];
    [updatedList[index], updatedList[index + 1]] = [
      updatedList[index + 1],
      updatedList[index],
    ];
    setMovies(updatedList);
  };

  const removeMovie = (index) => {
    const updatedList = movies.filter((_, i) => i !== index);
    setMovies(updatedList);
  };

  const handleAddMore = () => router.push("/movies");

  const handleDownloadImage = async () => {
    const element = document.getElementById("shareable-content");
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const link = document.createElement("a");
    link.download = `${listTitle.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center min-h-screen gap-6 p-6">
        <h1 className="text-3xl font-bold text-center text-amber-600 sm:text-4xl dark:text-amber-400">
          {listTitle}
        </h1>
        <p className="text-center text-gray-500">
          No movies in your list yet. <br />
          Click "Add More Movies" to start building your list!
        </p>
        <button
          onClick={handleAddMore}
          className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
        >
          Add More Movies
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 p-6">
      <div
        id="shareable-content"
        className="flex flex-col items-center gap-8 p-6 shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700"
      >
        {/* Title Section */}
        <div className="w-full max-w-3xl">
          {isTitleEditing ? (
            <div>
              {/* Input Field for Editing Title */}
              <input
                type="text"
                value={listTitle}
                onChange={handleTitleChange}
                className="w-full p-3 text-2xl font-bold text-center text-black transition-all duration-300 border-2 rounded-lg shadow-sm focus:border-amber-500 focus:outline-none"
                autoFocus
              />
              {/* Save Title Button */}
              <button
                onClick={saveTitle}
                className="w-full px-4 py-2 mt-2 text-lg font-semibold text-gray-900 transition rounded-lg bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
              >
                Save Title
              </button>
            </div>
          ) : (
            <h1
              id="list-title"
              className="text-4xl font-extrabold text-center text-black-400 sm:text-5xl dark:text-gray-800 drop-shadow-md"
            >
              {listTitle}
            </h1>
          )}
        </div>

        {/* Movies Section */}
        <div className="w-full max-w-3xl">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {movies.map((movie, index) => (
              <li
                key={index}
                className="flex flex-col items-center p-4 transition-all duration-200 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl dark:bg-gray-800 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-4">
                  {/* Ranking Number */}
                  <span className="text-3xl font-extrabold text-gray-600 dark:text-gray-400">
                    {index + 1}.
                  </span>
                  {/* Movie Poster */}
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={80}
                    height={120}
                    className="rounded-md shadow-md"
                  />
                </div>
                {/* Movie Title */}
                <p className="mt-2 text-lg font-semibold text-center text-gray-800 sm:text-xl dark:text-gray-200">
                  {movie.title}
                </p>
                {/* Optional Metadata (Stretch Goal) */}
                <p className="mt-1 text-sm text-center text-gray-500 dark:text-gray-400">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "Unknown Year"}
                </p>
                {isEditing && (
                  <UserListControls
                    onMoveUp={index > 0 ? () => moveUp(index) : null}
                    onMoveDown={
                      index < movies.length - 1 ? () => moveDown(index) : null
                    }
                    onRemove={() => removeMovie(index)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Branding or Optional Footer */}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Generated by ReflectYr - Share Your Favorites!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        {movies.length < 10 && !isEditing && (
          <button
            onClick={handleAddMore}
            className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
          >
            Add More Movies
          </button>
        )}
        {!isEditing ? (
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
          >
            Edit List
          </button>
        ) : (
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
          >
            Finalize List
          </button>
        )}
        <button
          onClick={toggleTitleEditMode}
          className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
          disabled={isTitleEditing}
        >
          Edit Title
        </button>
        <button
          onClick={handleDownloadImage}
          className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Download as Image
        </button>
        <button
          onClick={saveToDatabase}
          className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-60"
        >
          Save to Database
        </button>
      </div>
    </div>
  );
}
