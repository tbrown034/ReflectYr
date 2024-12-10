// Location: app/movies/components/SearchList.jsx
// Type: Server Component
// Purpose: Displays a filtered list of movies based on search queries.

import Link from "next/link";

export default function SearchList({ movies }) {
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
