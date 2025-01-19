// app/UI/Hero/TrendingTVShows.jsx

import { fetchTrendingShows } from "@/app/api/movies";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default async function TrendingTVShows() {
  let shows = [];
  let errorMessage = null;

  try {
    shows = await fetchTrendingShows(10);
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

  // Duplicate for continuous scroll
  const doubledShows = [...shows, ...shows];

  return (
    <div className="">
      <div className="flex items-center justify-between gap-8 mb-4">
        {/* Single badge for "Trending TV Shows" */}
        <h2 className="text-xl font-bold">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-black rounded-full bg-amber-500">
            TV Shows
          </span>
        </h2>

        {/* “Make Your List!” button */}
        <Link
          href="/tvshows"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 transition border rounded-md shadow border-amber-400 bg-amber-400 hover:bg-amber-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Make Your List!
        </Link>
      </div>

      {/* Add "group" so hover can pause the animation */}
      <div className="relative w-full overflow-hidden group rounded-xl">
        <div className="flex w-[200%] animate-scrollRight gap-4 sm:gap-8">
          {doubledShows.map((show, index) => (
            <div
              key={`${show.id}-${index}`}
              className="flex-shrink-0 w-24 sm:w-40"
            >
              {/* Wrap each poster in a Link to /tvshows/[id] */}
              <Link href={`/tvshows/${show.id}`}>
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
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
