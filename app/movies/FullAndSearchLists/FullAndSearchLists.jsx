"use client";

import { useState, useMemo } from "react";
import AddToListButton from "@/app/UI/components/buttons/AddToListButton";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/app/UI/components/SearchBar";
import PaginationControls from "@/app/UI/components/PaginationControls";

export default function FullAndSearchLists({
  movies,
  userList,
  addToUserList,
  currentPage,
  setCurrentPage,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize filtered movies to avoid unnecessary re-calculation
  const filteredMovies = useMemo(() => {
    return searchQuery
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : movies;
  }, [movies, searchQuery]);

  return (
    <section className="flex flex-col gap-6 p-4 bg-gray-200 shadow-xl dark:bg-gray-800 rounded-xl">
      <h1 className="text-2xl font-extrabold text-amber-500 dark:text-amber-400">
        Add Movies to Your List
      </h1>
      <p className="text-sm text-gray-700 dark:text-gray-400">
        Explore the most popular movies of the year, or search for your
        favorites to start building your personalized list.
      </p>

      <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />

      <ul className="flex flex-col gap-4 overflow-y-auto">
        {filteredMovies.map((movie) => {
          const isInUserList = userList.some((m) => m.id === movie.id);
          return (
            <li
              key={movie.id}
              className="flex items-center justify-between p-4 transition-all duration-200 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700"
            >
              <Link
                href={`/movies/${movie.id}`}
                className="flex items-center flex-1 gap-4"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${
                    movie.poster_path || "default-placeholder.jpg"
                  }`}
                  alt={movie.title}
                  width={80}
                  height={120}
                  className="rounded-md shadow-md"
                  loading="lazy" // Lazy loading for images
                />
                <p
                  className={`text-sm sm:text-lg font-semibold transition ${
                    isInUserList
                      ? "line-through decoration-[3px] decoration-amber-500"
                      : "text-gray-900 hover:text-amber-500 dark:text-gray-100 dark:hover:text-amber-400"
                  }`}
                >
                  {movie.title}
                </p>
              </Link>
              <AddToListButton
                onAdd={() => addToUserList(movie)}
                disabled={isInUserList}
                className="flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Add ${movie.title} to your list`}
              />
            </li>
          );
        })}
      </ul>

      <PaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
