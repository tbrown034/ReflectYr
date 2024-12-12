// app/movies/MoviesList/SearchList.jsx

import AddToListButton from "@/app/UI/components/AddToListButton";
import Link from "next/link";

export default function SearchList({ movies, addToUserList }) {
  return (
    <ul className="list-disc list-inside">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="flex items-center justify-between py-2 border-b"
        >
          <span>{movie.title}</span>
          <div className="flex gap-2">
            <Link
              href={`/movies/${movie.id}`}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Details
            </Link>
            <AddToListButton movie={movie} onAdd={() => addToUserList(movie)} />
          </div>
        </li>
      ))}
    </ul>
  );
}
