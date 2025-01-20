import AddToListButton from "@/app/UI/components/AddToListButton";
import Link from "next/link";
import Image from "next/image";

export default function FullList({ movies, userList, addToUserList }) {
  return (
    <ul className="space-y-4">
      {movies.map((movie) => {
        const isInUserList = userList.some((m) => m.id === movie.id);

        return (
          <li
            key={movie.id}
            className="flex items-center justify-between p-4 transition-all duration-200 bg-gray-100 rounded-lg shadow-sm hover:bg-white hover:shadow-md dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {/* Poster and Title inside Link */}
            <Link
              href={`/movies/${movie.id}`}
              className="flex items-center flex-1 gap-4"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={80}
                height={120}
                className="rounded-md shadow-md"
              />
              <p
                className={`text-sm sm:text-lg text-center font-semibold ${
                  isInUserList
                    ? "line-through decoration-[3px] decoration-amber-500"
                    : "text-gray-900 dark:text-gray-200"
                }`}
              >
                {movie.title}
              </p>
            </Link>

            {/* Add Button */}
            <AddToListButton
              onAdd={() => addToUserList(movie)} // Simplified function call
              disabled={isInUserList}
            />
          </li>
        );
      })}
    </ul>
  );
}
