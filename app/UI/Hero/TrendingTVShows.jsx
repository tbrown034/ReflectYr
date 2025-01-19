// app/UI/Hero/TrendingTVShows.jsx

import { fetchTrendingShows } from "@/app/api/movies";
import Image from "next/image";
import React from "react";

export default async function TrendingTVShows() {
  let shows = [];
  let errorMessage = null;

  try {
    shows = await fetchTrendingShows(10); // Fetch only 10 TV shows
    console.log("Shows fetched:", shows);
  } catch (error) {
    console.error("Error in TrendingTVShows component:", error.message);
    errorMessage = error.message;
  }

  if (errorMessage) {
    return (
      <div className="p-4 text-red-600">
        <h2 className="mb-4 text-sm font-bold">Trending TV Shows</h2>
        <p>{errorMessage}</p>
      </div>
    );
  }

  // Duplicate array for a seamless scroll
  const doubledShows = [...shows, ...shows];

  return (
    <div className="my-8">
      <h2 className="mb-4 text-xl font-bold">Trending TV Shows</h2>

      <div className="w-full overflow-hidden">
        {/* Animate using scrollRight */}
        <div className="flex w-[200%] animate-scrollRight gap-4 sm:gap-8">
          {doubledShows.map((show, index) => (
            <div
              key={`${show.id}-${index}`}
              className="flex-shrink-0 w-24 sm:w-40"
            >
              <Image
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={`Poster of ${show.name}`}
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
