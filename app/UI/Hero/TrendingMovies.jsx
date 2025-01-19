import { fetchTrendingMovies } from "@/app/api/movies";
import Image from "next/image";
import React from "react";

export default async function TrendingMovies() {
  let movies = [];
  let errorMessage = null;

  try {
    console.log("Calling fetchTrendingMovies...");
    movies = await fetchTrendingMovies(10); // Fetch only 10 movies
    console.log("Movies fetched:", movies);
  } catch (error) {
    console.error("Error in TrendingMovies component:", error.message);
    errorMessage = error.message;
  }

  if (errorMessage) {
    return (
      <div className="p-4 text-red-600">
        <h2 className="mb-4 text-sm font-bold">Trending Movies</h2>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Horizontal scroll container */}
      <div className="relative overflow-x-auto">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-40">
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
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
