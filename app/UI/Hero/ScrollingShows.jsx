import { fetchPopularTVShows } from "@/app/api/tvShows";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default async function ScrollingShows({ year = 2025 }) {
  let shows = [];
  let errorMessage = null;

  try {
    shows = await fetchPopularTVShows(1, year);
  } catch (error) {
    console.error("Error in ScrollingShows component:", error.message);
    errorMessage = error.message;
  }

  if (errorMessage) {
    return (
      <div className="p-4 text-red-600">
        <h2 className="mb-4 text-sm font-bold">Popular TV Shows</h2>
        <p>{errorMessage}</p>
      </div>
    );
  }

  const doubledShows = [...shows, ...shows];

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-black rounded-full bg-amber-500">
          Popular TV Shows
        </span>
      </h2>

      <div className="relative w-full overflow-hidden group rounded-xl">
        <div className="flex w-[200%] animate-scrollRight gap-4 sm:gap-8">
          {doubledShows.map((show, index) => (
            <div
              key={`${show.id}-${index}`}
              className="flex-shrink-0 w-24 sm:w-40"
            >
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
