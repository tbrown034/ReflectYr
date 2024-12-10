// Location: app/movies/components/FullList.jsx
// Type: Server Component
// Purpose: Displays a paginated list of movies (discover endpoint results).

import Link from "next/link";

export default function FullList({ movies }) {
  return (
    <ul className="list-disc list-inside">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="flex items-center justify-between py-2 border-b"
        >
          <span>{movie.title}</span>
          <Link
            href={`/movies/${movie.id}`}
            className="px-2 py-1 text-sm text-white bg-black rounded hover:bg-gray-700"
          >
            Details
          </Link>
        </li>
      ))}
    </ul>
  );
}
