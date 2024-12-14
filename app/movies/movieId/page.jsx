import Image from "next/image";
import { fetchMovieDetails } from "@/app/api/movies";
import Link from "next/link";
import AddToListClient from "./AddToListClient";

export default async function MovieDetailsPage({ params: paramsPromise }) {
  const params = await paramsPromise;

  const { id } = params;

  // Fetch movie details using the provided id
  const movie = await fetchMovieDetails(id);

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
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p className="text-lg font-medium">
        <strong>Average Rating:</strong> {movie.vote_average} (
        {movie.vote_count} votes)
      </p>
      <AddToListClient movie={movie} />
    </div>
  );
}
