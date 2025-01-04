import Image from "next/image";
import { fetchMovieDetails } from "@/app/api/movies";
import Link from "next/link";
import AddToListClient from "./AddToListClient";

export default async function MovieDetailsPage({ params: paramsPromise }) {
  // Await the params object
  const params = await paramsPromise;

  // Extract the id from the route parameters
  const { id } = params;

  // Fetch movie details using the provided id
  const movie = await fetchMovieDetails(id);

  // Helper function: Format release date
  const formatReleaseDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Helper function: Convert rating to stars
  const formatRatingAsStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 0.5;
    const stars = "★".repeat(fullStars);
    const halfStar = hasHalfStar ? "½" : "";
    const emptyStars = "☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
    return `${stars}${halfStar}${emptyStars}`;
  };

  return (
    <div className="flex flex-col min-h-screen gap-6 p-6 ">
      {/* Title */}
      <h1 className="text-4xl font-bold text-amber-600 dark:text-amber-400">
        {movie.title}
      </h1>

      {/* Overview */}
      <p className="text-gray-700 dark:text-gray-300">{movie.overview}</p>

      {/* Poster Image */}
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={250}
        className="rounded-lg shadow-lg"
      />

      {/* Release Date */}
      <p className="text-lg font-medium">
        <strong className="text-amber-600 dark:text-amber-400">
          Release Date:
        </strong>{" "}
        <span className="text-gray-800 dark:text-gray-200">
          {formatReleaseDate(movie.release_date)}
        </span>
      </p>

      {/* Average Rating */}
      <p className="text-lg font-medium">
        <strong className="text-amber-600 dark:text-amber-400">
          Average Rating:
        </strong>{" "}
        <span className="text-gray-800 dark:text-gray-200">
          {formatRatingAsStars(movie.vote_average)} ({movie.vote_count} votes)
        </span>
      </p>

      {/* Add to List */}
      <AddToListClient movie={movie} />

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4 mt-4">
        <Link href="/movies">
          <button className="px-4 py-2 font-medium text-gray-900 rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600">
            Go Back
          </button>
        </Link>
        <Link href="/">
          <button className="px-4 py-2 font-medium text-gray-900 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
