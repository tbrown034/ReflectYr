"use client";

import { useState, useEffect } from "react";
import UserListControls from "@/app/movies/UserListFolder/UserListControls";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoggedOutList({ temporaryListId }) {
  const [movies, setMovies] = useState([]);
  const [listTitle, setListTitle] = useState("My Top Movies of 2024");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

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
      <h1 className="text-3xl font-bold text-center text-amber-600 sm:text-4xl dark:text-amber-400">
        {listTitle}
      </h1>
      <div
        id="shareable-content"
        className="w-full max-w-3xl p-4 bg-gray-200 border-4 border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {movies.map((movie, index) => (
            <li
              key={index}
              className="transition-all duration-200 bg-gray-100 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-4 p-4">
                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {index + 1}.
                </span>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={60}
                  height={90}
                  className="rounded-md shadow-md"
                />
                <p className="flex-1 text-sm font-semibold text-gray-800 sm:text-lg dark:text-gray-200">
                  {movie.title}
                </p>
              </div>
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
          onClick={handleDownloadImage}
          className="px-4 py-2 text-sm font-semibold text-gray-100 transition bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Download as Image
        </button>
      </div>
    </div>
  );
}
