import AddToListButton from "@/app/UI/components/AddToListButton";
import Link from "next/link";

export default function SearchList({ movies, userList, addToUserList }) {
  return (
    <ul className="divide-y divide-gray-700">
      {movies.map((movie) => {
        const isInUserList = userList.some((m) => m.id === movie.id);

        return (
          <li
            key={movie.id}
            className="flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-gray-800"
          >
            {/* Movie Title with Conditional Strikethrough */}
            <Link
              href={`/movies/${movie.id}`}
              className={`flex-1 text-lg font-semibold hover:text-amber-400 ${
                isInUserList
                  ? "line-through decoration-amber-400 opacity-75"
                  : "text-gray-100"
              }`}
            >
              {movie.title}
            </Link>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* Details Button */}
              <Link
                href={`/movies/${movie.id}`}
                className="px-4 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded w-28 hover:bg-gray-500"
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
