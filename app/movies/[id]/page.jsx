// Location: app/movies/[id]/page.jsx
// Type: Server Component
// Purpose: Fetch and display movie details based on the dynamic "id" from the URL.

import Image from "next/image";
import { fetchMovieDetails } from "@/app/api/movies";

export default async function MovieDetailsPage({ params: paramsPromise }) {
  const params = await paramsPromise; // Await the params object
  const { id } = params; // Extract "id" from the dynamic route
  const movie = await fetchMovieDetails(id); // Fetch movie details

  // Helper function to format release date
  const formatReleaseDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Helper function to convert rating to stars
  const formatRatingAsStars = (rating) => {
    const fullStars = Math.floor(rating / 2); // Convert TMDB rating (out of 10) to 5 stars
    const hasHalfStar = rating % 2 >= 0.5;

    const stars = "★".repeat(fullStars); // Full stars
    const halfStar = hasHalfStar ? "½" : ""; // Half star
    const emptyStars = "☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0)); // Empty stars

    return `${stars}${halfStar}${emptyStars}`;
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Movie Title */}
      <h1 className="text-4xl font-bold">{movie.title}</h1>

      {/* Overview */}
      <p className="text-gray-700">{movie.overview}</p>

      {/* Poster Image */}
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
        className="rounded-lg shadow-md"
      />

      {/* Additional Details */}
      <p className="text-lg font-medium">
        <strong>Release Date:</strong> {formatReleaseDate(movie.release_date)}
      </p>
      <p className="text-lg font-medium">
        <strong>Average Rating:</strong>{" "}
        {formatRatingAsStars(movie.vote_average)} ({movie.vote_count} votes)
      </p>

      {/* Add to List Button (non-functional for now) */}
      <button className="px-4 py-2 text-white bg-black rounded hover:bg-gray-700">
        Add to List
      </button>
    </div>
  );
}
