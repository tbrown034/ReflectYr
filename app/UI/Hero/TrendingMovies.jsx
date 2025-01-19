// app/UI/Hero/TrendingMovies.jsx

import { fetchTrendingMovies } from "@/app/api/movies";
import Image from "next/image";
import React from "react";

export default async function TrendingMovies() {
  let movies = [];
  let errorMessage = null;

  try {
    movies = await fetchTrendingMovies(10); // Fetch only 10 movies
    console.log("Movies fetched:", movies);
  } catch (error) {
    console.error("Error in TrendingMovies component:", error.message);
    errorMessage = error.message;
  }

  // If error, display a simple message
  if (errorMessage) {
    return (
      <div className="p-4 text-red-600">
        <h2 className="mb-4 text-sm font-bold">Trending Movies</h2>
        <p>{errorMessage}</p>
      </div>
    );
  }

  // Duplicate array for a seamless scroll
  const doubledMovies = [...movies, ...movies];

  return (
    <div className="my-8">
      <h2 className="mb-4 text-xl font-bold">Trending Movies</h2>

      {/* Outer container: hide overflow so wide content won't scroll the page */}
      <div className="relative w-full overflow-hidden">
        {/* The 200%-wide container that slides left */}
        <div className="flex w-[200%] animate-scrollLeft gap-4 sm:gap-8">
          {doubledMovies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              // On mobile: w-24, on larger screens: w-40
              className="flex-shrink-0 w-24 sm:w-40"
            >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
