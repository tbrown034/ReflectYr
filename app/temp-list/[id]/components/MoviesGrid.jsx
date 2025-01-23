"use client";

import Image from "next/image";
import UserListControls from "@/app/UI/components/UserListControls";

export default function MoviesGrid({
  movies,
  isEditing,
  onMoveDown,
  onRemove,
}) {
  return (
    <div className="w-full">
      <ul className="grid gap-6 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie, index) => (
          <li
            key={index}
            className="relative flex flex-col items-center gap-4 p-4 transition-all duration-200 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {/* Ranking Number */}
            <div className="absolute flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-500 rounded-full top-2 left-2 sm:w-10 sm:h-10 sm:text-lg">
              {index + 1}
            </div>

            {/* Movie Poster */}
            <div className="w-32 h-48 overflow-hidden rounded-md shadow-md sm:w-40 sm:h-60">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={150}
                height={225}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Movie Title */}
            <p className="mt-2 text-sm font-semibold text-center text-gray-800 sm:text-base dark:text-gray-200">
              {movie.title}
            </p>

            {/* Edit Controls */}
            {isEditing && (
              <div className="mt-4">
                <UserListControls
                  onMoveUp={index > 0 ? () => onMoveDown(index - 1) : null}
                  onMoveDown={
                    index < movies.length - 1 ? () => onMoveDown(index) : null
                  }
                  onRemove={() => onRemove(index)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
