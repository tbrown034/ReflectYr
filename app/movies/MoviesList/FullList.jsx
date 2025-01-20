import AddToListButton from "@/app/UI/components/AddToListButton";
import Link from "next/link";
import Image from "next/image";

export default function FullList({ movies, userList, addToUserList }) {
  return (
    <ul className="space-y-4">
      {movies.map((movie) => {
        const isInUserList = userList.some((m) => m.id === movie.id);

        return (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="flex items-center justify-between p-4 transition-all duration-200 bg-gray-100 rounded-lg shadow-sm hover:bg-white hover:shadow-md dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {/* Poster */}
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={80}
              height={120}
              className="rounded-md shadow-md"
            />
            {/* Title */}
            <p
              className={`text-sm sm:text-lg text-center font-semibold ${
                isInUserList
                  ? "line-through decoration-[3px] decoration-amber-500"
                  : "text-gray-900 dark:text-gray-200"
              }`}
            >
              {movie.title}
            </p>
            {/* Add Button */}
            <AddToListButton
              movie={movie}
              onAdd={(e) => {
                e.preventDefault(); // Prevents navigation when the button is clicked
                addToUserList(movie);
              }}
              disabled={isInUserList}
            />
          </Link>
        );
      })}
    </ul>
  );
}
