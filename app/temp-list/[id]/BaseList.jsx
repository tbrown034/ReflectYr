"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Components
import Title from "./components/Title";
import ActionButtons from "./components/ActionButtons";
import UserListControls from "@/app/UI/components/UserListControls";

// Helpers
import { saveToDB } from "@/app/util/utilities";
import {
  removeMovie,
  moveUp,
  moveDown,
  handleClear,
} from "@/app/helpers/listHelpers";

export default function BaseList({ temporaryListId, initialTitle, allowSave }) {
  const [movies, setMovies] = useState([]);
  const [listTitle, setListTitle] = useState(initialTitle);

  // Separate states for editing
  const [isListEditing, setIsListEditing] = useState(false); // For reorder/remove
  const [isTitleEditing, setIsTitleEditing] = useState(false); // For changing the title

  const router = useRouter();

  // Load any existing list from localStorage
  useEffect(() => {
    const storedList = localStorage.getItem(`temporaryList-${temporaryListId}`);
    if (storedList) {
      setMovies(JSON.parse(storedList));
    }
  }, [temporaryListId]);

  // List Control Handlers
  const handleRemove = (index) => {
    removeMovie(movies, setMovies, movies[index].id);
  };

  const handleMoveUp = (index) => {
    moveUp(index, movies, setMovies);
  };

  const handleMoveDown = (index) => {
    moveDown(index, movies, setMovies);
  };

  const handleClearList = () => {
    handleClear(setMovies);
  };

  // Save to DB (unchanged)
  const handleSaveList = () => {
    if (!allowSave) {
      alert("Saving is not allowed.");
      return;
    }
    saveToDB({
      listTitle,
      movies,
      allowSave,
      router,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Title Section */}
      <Title
        listTitle={listTitle}
        onTitleChange={setListTitle}
        isTitleEditing={isTitleEditing}
        setIsTitleEditing={setIsTitleEditing}
      />

      {/* Movie List */}
      <ul className="flex flex-wrap justify-center gap-4 ">
        {movies.map((movie, index) => (
          <li
            key={movie.id}
            className="relative flex flex-col items-center w-40 p-3 bg-gray-700 rounded-lg shadow-md dark:bg-gray-800 sm:w-48"
          >
            {/* Ranking Number */}
            <div className="absolute flex items-center justify-center text-sm font-bold text-white bg-blue-500 rounded-full w-7 h-7 left-2 top-2">
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
                  width={160}
                  height={240}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Movie Title */}
              <p className="text-sm font-semibold text-center text-gray-300 sm:text-base">
                {movie.title}
              </p>
            </Link>

            {/* Edit Controls */}
            {isListEditing && (
              <UserListControls
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
                onRemove={() => handleRemove(index)}
              />
            )}
          </li>
        ))}
      </ul>

      {/* Bottom action buttons */}
      <ActionButtons
        router={router}
        isListEditing={isListEditing}
        setIsListEditing={setIsListEditing}
        allowSave={allowSave}
        handleSaveList={handleSaveList}
        handleClearList={handleClearList}
        movies={movies}
        setMovies={setMovies}
      />
    </div>
  );
}
