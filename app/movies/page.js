// src/app/movies/page.js
import Link from "next/link";

// Fetch data directly in the Server Component
async function fetchMovies() {
  const year = 2024;
  const sortBy = "vote_average.desc"; // Sort by highest-rated movies
  const url = `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&sort_by=${sortBy}&language=en-US&page=1`;

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDM_API_KEY}`, // Use your API key
    },
    cache: "no-store", // Always fetch fresh data
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data = await response.json();
  return data.results.slice(0, 10); // Return the top 10 movies
}

export default async function MoviesPage() {
  const movies = await fetchMovies(); // Fetch data directly in the server component

  return (
    <main className="flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Top Rated Movies of 2024</h1>
        <h3 className="text-xl">Select Your Top Movies</h3>
      </div>

      {/* Movies List */}
      <section className="p-4 border-2 border-black rounded-xl">
        <ul className="list-disc list-inside">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="flex items-center justify-between py-2 border-b"
            >
              <span className="font-medium">{movie.title}</span>
              <Link
                href={`/movies/${movie.id}`}
                className="px-2 py-1 text-sm text-white bg-black rounded hover:bg-gray-700"
              >
                Details
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Back to Home */}
      <Link
        href="/"
        className="px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
      >
        Back to Home
      </Link>
    </main>
  );
}
