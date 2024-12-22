import AddToListButton from "@/app/UI/components/AddToListButton";
import Link from "next/link";
import Image from "next/image";
export default function FullList({ movies, userList, addToUserList }) {
  return (
    <ul className="p-4 divide-y divide-gray-700">
      {movies.map((movie) => {
        const isInUserList = userList.some((m) => m.id === movie.id);

        return (
          <li
            key={movie.id}
            className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:gap-6 hover:bg-gray-800"
          >
            {/* Movie Poster and Title */}
            <div className="flex items-center flex-1 gap-4">
              {/* Poster */}
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={80}
                height={120}
                className="rounded-md shadow-md"
              />

              {/* Title */}
              <Link
                href={`/movies/${movie.id}`}
                className={`text-base font-semibold hover:text-amber-400 ${
                  isInUserList
                    ? "line-through decoration-amber-400 opacity-75"
                    : "text-gray-100"
                }`}
              >
                {movie.title}
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex self-start gap-3 sm:self-center">
              {/* Details Button */}
              <Link
                href={`/movies/${movie.id}`}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded hover:bg-gray-500 sm:text-base"
              >
                Details
              </Link>

              {/* Add to List Button */}
              <AddToListButton
                movie={movie}
                onAdd={() => addToUserList(movie)}
                disabled={isInUserList}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
