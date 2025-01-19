import { fetchTrendingShows } from "@/app/api/movies";
import Image from "next/image";
import React from "react";

export default async function TrendingTVShows() {
  let shows = [];
  let errorMessage = null;

  try {
    console.log("Calling fetchTrendingShows...");
    shows = await fetchTrendingShows(10); // Fetch only 10 US-based shows
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

  return (
    <div>
      {/* Horizontal scroll container */}
      <div className="relative overflow-x-auto">
        <div className="flex gap-4">
          {shows.map((show) => (
            <div key={show.id} className="flex-shrink-0 w-40">
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
