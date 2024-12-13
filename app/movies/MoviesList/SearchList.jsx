import AddToListButton from "@/app/UI/components/AddToListButton";
import Link from "next/link";

export default function SearchList({ movies, userList, addToUserList }) {
  return (
    <ul className="list-disc list-inside">
      {movies.map((movie) => {
        const isInUserList = userList.some((m) => m.id === movie.id);

        return (
          <li
            key={movie.id}
            className="flex items-center justify-between py-2 border-b cursor-pointer hover:bg-gray-100"
          >
            <Link
              href={`/movies/${movie.id}`}
              className="flex-1 text-blue-600 hover:underline"
            >
              {movie.title}
            </Link>
            <div className="flex gap-2">
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
