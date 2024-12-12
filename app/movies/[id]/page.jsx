// Location: app/movies/[id]/page.jsx
import Image from "next/image";
import { fetchMovieDetails } from "@/app/api/movies";
import AddToListClient from "./AddToListClient";

export default async function MovieDetailsPage({ params: paramsPromise }) {
  // Await the params object
  const params = await paramsPromise;

  // Extract the `id` from the route parameters
  const { id } = params;

  // Fetch movie details using the provided `id`
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
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p className="text-gray-700">{movie.overview}</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
        className="rounded-lg shadow-md"
      />
      <p className="text-lg font-medium">
        <strong>Release Date:</strong> {formatReleaseDate(movie.release_date)}
      </p>
      <p className="text-lg font-medium">
        <strong>Average Rating:</strong>{" "}
        {formatRatingAsStars(movie.vote_average)} ({movie.vote_count} votes)
      </p>

      {/* Interactive Add to List Button */}
      <AddToListClient movie={movie} />
    </div>
  );
}
