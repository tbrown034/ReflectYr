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
    <div className="flex flex-col min-h-screen gap-6 p-6 text-gray-100 bg-gray-900">
      <h1 className="text-4xl font-bold text-amber-400">{movie.title}</h1>
      <p className="text-gray-300">{movie.overview}</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={250}
        className="rounded-lg shadow-lg"
      />
      <p className="text-lg font-medium">
        <strong className="text-amber-400">Release Date:</strong>{" "}
        {formatReleaseDate(movie.release_date)}
      </p>
      <p className="text-lg font-medium">
        <strong className="text-amber-400">Average Rating:</strong>{" "}
        {formatRatingAsStars(movie.vote_average)} ({movie.vote_count} votes)
      </p>

      {/* Use AddToListClient for interactivity */}
      <AddToListClient movie={movie} />

      <div className="flex gap-4 mt-4">
        <Link href="/movies">
          <button className="px-4 py-2 text-gray-900 rounded bg-amber-400 hover:bg-amber-500">
            Go Back
          </button>
        </Link>
        <Link href="/">
          <button className="px-4 py-2 text-gray-900 bg-gray-300 rounded hover:bg-gray-400">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
