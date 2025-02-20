import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchDiscoverMovies } from "@/app/api/movies";

export default async function ScrollingMovies({ year = 2025 }) {
  let movies = [];
  let errorMessage = null;

  try {
    movies = await fetchDiscoverMovies(1, year);
  } catch (error) {
    console.error("Error in ScrollingMovies component:", error.message);
    errorMessage = error.message;
  }

  if (errorMessage) {
    return (
      <div className="p-4 text-red-600">
        <h2 className="mb-4 text-sm font-bold">Popular Movies</h2>
        <p>{errorMessage}</p>
      </div>
    );
  }

  const doubledMovies = [...movies, ...movies];

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-black rounded-full bg-amber-500">
          Popular Movies
        </span>
      </h2>

      <div className="relative w-full overflow-hidden group rounded-xl">
        <div className="flex w-[200%] animate-scrollLeft gap-4 sm:gap-8">
          {doubledMovies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              className="flex-shrink-0 w-24 sm:w-40"
            >
              <Link href={`/movies/${movie.id}`}>
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={`Poster of ${movie.title}`}
                  width={300}
                  height={450}
                  className="object-cover rounded-lg"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
