import UserListControls from "./UserListControls";
import UserListButtons from "./UserListButtons";
import Link from "next/link";

export default function UserList({
  userList,
  removeMovie,
  moveUp,
  moveDown,
  setUserList,
}) {
  const placeholderMovies = [
    "Movie 1",
    "Movie 2",
    "Movie 3",
    "Movie 4",
    "Movie 5",
    "Movie 6",
    "Movie 7",
    "Movie 8",
    "Movie 9",
    "Movie 10",
  ];

  const moviesToDisplay = userList.length > 0 ? userList : placeholderMovies;

  return (
    <section className="p-4 rounded-lg shadow-lg">
      {userList.length > 0 && (
        <p className="mb-4 text-sm text-gray-400">
          {`${userList.length}/10 movies added`}
        </p>
      )}

      {/* Numbered List */}
      <ol className="space-y-2">
        {moviesToDisplay.map((movie, index) => (
          <li
            key={index}
            className="flex items-center gap-4 px-4 py-2 transition rounded-lg hover:bg-gray-800"
          >
            {/* Number */}
            <span className="w-6 text-lg font-bold text-gray-400">
              {index + 1}.
            </span>

            {/* Movie Title */}
            {userList.length > 0 ? (
              <Link
                href={`/movies/${movie.id}`}
                className="flex-1 text-lg font-semibold text-gray-100 hover:text-amber-400"
              >
                {movie.title}
              </Link>
            ) : (
              <span className="flex-1 text-gray-400">{movie}</span>
            )}

            {/* Controls for Up, Down, Remove */}
            {userList.length > 0 && (
              <UserListControls
                onMoveUp={index > 0 ? () => moveUp(index) : null}
                onMoveDown={
                  index < userList.length - 1 ? () => moveDown(index) : null
                }
                onRemove={() => removeMovie(movie.id)}
              />
            )}
          </li>
        ))}
      </ol>

      {/* Clear and Submit Buttons */}
      <UserListButtons userList={userList} setUserList={setUserList} />
    </section>
  );
}
