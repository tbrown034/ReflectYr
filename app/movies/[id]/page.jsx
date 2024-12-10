// Location: app/movies/[id]/page.jsx
// Type: Server Component
// Purpose: Dynamically fetches and displays movie details using TMDB's Movie Details API.

import Image from "next/image";

async function fetchMovieDetails(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDM_API_KEY}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for ID ${id}`);
  }

  return response.json();
}

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
      <p className="text-lg font-medium">Release Date: {movie.release_date}</p>
      <p className="text-lg font-medium">
        Average Rating: {movie.vote_average} ({movie.vote_count} votes)
      </p>
      <button className="px-4 py-2 text-white bg-black rounded hover:bg-gray-700">
        Add to List
      </button>
    </div>
  );
}
