import AddToListButton from "@/app/UI/components/AddToListButton";
import Link from "next/link";
import Image from "next/image";

export default function FullList({ movies, userList, addToUserList }) {
  return (
    <ul className="space-y-4 ">
      {movies.map((movie) => {
        const isInUserList = userList.some((m) => m.id === movie.id);

        return (
          <li
            key={movie.id}
            className="flex items-center justify-between p-4 transition-all duration-200 bg-gray-900 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-700"
          >
            {/* Clickable Row */}
            <Link
              href={`/movies/${movie.id}`}
              className="flex items-center flex-1 gap-4"
            >
              {/* Poster and Title */}
              <div className="flex items-center gap-4">
                {/* Poster */}
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={80}
                  height={120}
                  className="flex-shrink-0 rounded-md shadow-md"
                />

                {/* Title */}
                <p
                  className={`text-xs sm:text-lg font-semibold ${
                    isInUserList
                      ? "line-through decoration-[3px] decoration-amber-500 opacity-100"
                      : "text-gray-100 hover:text-amber-400"
                  }`}
                >
                  {movie.title}
                </p>
              </div>
            </Link>

            {/* Add/Added Button */}
            <div>
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
