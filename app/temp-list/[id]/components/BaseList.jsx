"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Title from "../components/Title";
import UserListControls from "../../../UI/components/UserListControls";
import { handleClear, saveToDB } from "@/app/helpers/listcontrols";

export default function BaseList({
  temporaryListId,
  initialTitle,
  allowSave,
  session,
}) {
  const [movies, setMovies] = useState([]);
  const [listTitle, setListTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedList = localStorage.getItem(`temporaryList-${temporaryListId}`);
    if (storedList) {
      setMovies(JSON.parse(storedList));
    }
  }, [temporaryListId]);

  const handleSaveList = () => {
    saveToDB({
      listTitle,
      movies,
      allowSave,
      setSuggestedTitle: () => {}, // No-op for now; expand later if needed
      router,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Title Section */}
      <Title
        listTitle={listTitle}
        isEditing={isEditing}
        onTitleChange={setListTitle}
      />

      {/* Movies Grid */}
      <div className="w-full">
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie, index) => (
            <li
              key={movie.id}
              className="relative flex flex-col items-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-700"
            >
              {/* Ranking Number */}
              <div className="absolute flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-500 rounded-full top-2 left-2 sm:w-10 sm:h-10 sm:text-lg">
                {index + 1}
              </div>

              {/* Movie Poster */}
              <Link
                href={`/movies/${movie.id}`}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-32 h-48 overflow-hidden rounded-md shadow-md sm:w-40 sm:h-60">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={150}
                    height={225}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="p-2 text-sm font-semibold text-center text-gray-800 sm:text-base dark:text-gray-200">
                  {movie.title}
                </p>
              </Link>

              {/* Edit Controls */}
              {isEditing && (
                <UserListControls
                  onMoveUp={
                    index > 0
                      ? () =>
                          setMovies((prev) => {
                            const updatedList = [...prev];
                            [updatedList[index - 1], updatedList[index]] = [
                              updatedList[index],
                              updatedList[index - 1],
                            ];
                            return updatedList;
                          })
                      : null
                  }
                  onMoveDown={
                    index < movies.length - 1
                      ? () =>
                          setMovies((prev) => {
                            const updatedList = [...prev];
                            [updatedList[index], updatedList[index + 1]] = [
                              updatedList[index + 1],
                              updatedList[index],
                            ];
                            return updatedList;
                          })
                      : null
                  }
                  onRemove={() =>
                    setMovies((prev) =>
                      prev.filter((_, movieIndex) => movieIndex !== index)
                    )
                  }
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => router.push("/movies")}
          className="px-4 py-2 text-sm font-semibold text-gray-900 rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
        >
          Add More Movies
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-semibold text-gray-900 rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600"
        >
          {isEditing ? "Finish Editing" : "Edit"}
        </button>
        {allowSave && (
          <button
            onClick={handleSaveList}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Save List
          </button>
        )}
        <button
          onClick={() => handleClear(setMovies)}
          className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600"
        >
          Clear List
        </button>
      </div>
    </div>
  );
}
