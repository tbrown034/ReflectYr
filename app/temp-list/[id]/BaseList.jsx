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
      {/* Title with its own “edit title” logic */}
      <Title
        listTitle={listTitle}
        onTitleChange={setListTitle}
        isTitleEditing={isTitleEditing}
        setIsTitleEditing={setIsTitleEditing}
      />

      <div className="w-full">
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie, index) => (
            <li
              key={movie.id}
              className="relative flex flex-col items-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-700"
            >
              {/* Ranking Number */}
              <div className="absolute flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-500 rounded-full left-2 top-2 sm:h-10 sm:w-10 sm:text-lg">
                {index + 1}
              </div>

              <Link href={`/movies/${movie.id}`}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-32 h-48 overflow-hidden rounded-md shadow-md sm:h-60 sm:w-40">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={150}
                      height={225}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="p-2 text-sm font-semibold text-center text-gray-800 dark:text-gray-200 sm:text-base">
                    {movie.title}
                  </p>
                </div>
              </Link>

              {/* Show reorder/remove controls only if isListEditing */}
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
      </div>

      {/* Bottom action buttons: toggles only isListEditing */}
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
