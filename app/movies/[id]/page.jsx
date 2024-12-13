import Image from "next/image";
import { fetchMovieDetails } from "@/app/api/movies";
import AddToListButton from "@/app/UI/components/AddToListButton";
import Link from "next/link";

export default async function MovieDetailsPage({ params }) {
  const { id } = params;
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
      <AddToListButton movie={movie} onAdd={() => console.log(movie)} />
      <div className="flex gap-4 mt-4">
        <Link href="/movies">
          <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800">
            Go Back
          </button>
        </Link>
        <Link href="/">
          <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
