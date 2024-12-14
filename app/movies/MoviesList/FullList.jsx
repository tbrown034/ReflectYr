import AddToListButton from "@/app/UI/components/AddToListButton";
import Link from "next/link";

export default function FullList({ movies, userList, addToUserList }) {
  return (
    <ul className="list-disc list-inside">
      {movies.map((movie) => {
        const isInUserList = userList.some((m) => m.id === movie.id);

        return (
          <li
            key={movie.id}
            className="flex items-center justify-between py-2 border-b cursor-pointer hover:bg-gray-100"
          >
            {/* Movie Title as a Link */}
            <Link
              href={`/movies/${movie.id}`}
              className="flex-1 text-blue-600 hover:underline"
            >
              {movie.title}
            </Link>
            <div className="flex gap-2">
              {/* Details Button as a Link */}
              <Link
                href={`/movies/${movie.id}`}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800"
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
