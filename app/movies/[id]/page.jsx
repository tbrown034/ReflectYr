import Image from "next/image";
import { fetchMovieDetails } from "@/app/api/movies";
import Link from "next/link";
import AddToListClient from "./AddToListClient";

export default async function MovieDetailsPage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { id } = params;
  const movie = await fetchMovieDetails(id);

  const formatReleaseDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const formatRatingAsStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 0.5;
    const stars = "★".repeat(fullStars);
    const halfStar = hasHalfStar ? "½" : "";
    const emptyStars = "☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
    return `${stars}${halfStar}${emptyStars}`;
  };

  return (
    <div className="flex flex-col min-h-screen gap-8 p-6 bg-gray-100 dark:bg-gray-900">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-amber-600 dark:text-amber-400">
        {movie.title}
      </h1>

      {/* Poster, Rating, and Release Date */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg shadow-md"
        />

        <div className="flex flex-col gap-4">
          <p className="text-lg">
            <strong className="text-amber-600 dark:text-amber-400">
              Release Date:
            </strong>{" "}
            <span className="text-gray-800 dark:text-gray-200">
              {formatReleaseDate(movie.release_date)}
            </span>
          </p>
          <p className="text-lg">
            <strong className="text-amber-600 dark:text-amber-400">
              Average Rating:
            </strong>{" "}
            <span className="text-gray-800 dark:text-gray-200">
              {formatRatingAsStars(movie.vote_average)} ({movie.vote_count}{" "}
              votes)
            </span>
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="p-6 bg-gray-200 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Overview
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{movie.overview}</p>
      </div>

      {/* Add to List */}
      <AddToListClient movie={movie} />

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Link href="/movies">
          <button className="px-6 py-3 font-medium text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:text-gray-900 dark:hover:bg-amber-600">
            Go Back
          </button>
        </Link>
        <Link href="/">
          <button className="px-6 py-3 font-medium text-gray-900 transition bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
