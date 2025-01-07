"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Title from "./Title";
import ActionButtons from "./ActionButtons";
import html2canvas from "html2canvas";

export default function BaseList({
  temporaryListId,
  initialTitle,
  allowSave = false,
}) {
  const [movies, setMovies] = useState([]);
  const [listTitle, setListTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const router = useRouter();

  // Load movies from localStorage
  useEffect(() => {
    const storedList = localStorage.getItem(`temporaryList-${temporaryListId}`);
    if (storedList) {
      try {
        setMovies(JSON.parse(storedList));
      } catch (error) {
        console.error("Error parsing stored list:", error);
      }
    }
  }, [temporaryListId]);

  const handleAddMore = () => router.push("/movies");

  const handleDownloadImage = async () => {
    const element = document.getElementById("shareable-content");
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const link = document.createElement("a");
    link.download = `${listTitle.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleSaveList = () => {
    if (allowSave) {
      console.log("List Saved:", {
        title: listTitle,
        topMovie: movies[0]?.title,
      });
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updatedList = [...movies];
    [updatedList[index - 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index - 1],
    ];
    setMovies(updatedList);
  };

  const handleMoveDown = (index) => {
    if (index === movies.length - 1) return;
    const updatedList = [...movies];
    [updatedList[index], updatedList[index + 1]] = [
      updatedList[index + 1],
      updatedList[index],
    ];
    setMovies(updatedList);
  };

  const handleRemove = (index) => {
    const updatedList = movies.filter((_, i) => i !== index);
    setMovies(updatedList);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Title Section */}
      <Title
        listTitle={listTitle}
        isEditing={isTitleEditing}
        onTitleChange={(e) => setListTitle(e.target.value)}
        onSave={() => setIsTitleEditing(false)}
      />

      {/* Movies Section */}
      <div
        id="shareable-content"
        className="w-full max-w-6xl p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800"
      >
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie, index) => (
            <li
              key={index}
              className="relative flex flex-col items-center p-4 transition-all duration-200 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {/* Ranking Number */}
              <div className="absolute flex items-center justify-center w-8 h-8 text-lg font-bold text-white bg-blue-500 rounded-full top-2 left-2">
                {index + 1}
              </div>

              {/* Movie Poster */}
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={150}
                height={225}
                className="rounded-md shadow-md"
              />

              {/* Movie Title */}
              <p className="mt-2 text-sm font-semibold text-center text-gray-800 sm:text-base dark:text-gray-200">
                {movie.title}
              </p>

              {/* Edit Controls */}
              {isEditing && (
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className={`px-2 py-1 text-sm font-bold text-white rounded ${
                      index === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === movies.length - 1}
                    className={`px-2 py-1 text-sm font-bold text-white rounded ${
                      index === movies.length - 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleRemove(index)}
                    className="px-2 py-1 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <ActionButtons
        isEditing={isEditing}
        isTitleEditing={isTitleEditing}
        onAddMore={handleAddMore}
        onEditList={() => setIsEditing(true)}
        onFinalizeList={() => setIsEditing(false)}
        onEditTitle={() => setIsTitleEditing(true)}
        onSaveList={handleSaveList}
        onDownloadImage={handleDownloadImage}
      />
    </div>
  );
}
