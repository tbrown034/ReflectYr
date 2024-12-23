import UserListControls from "./UserListControls";
import UserListButtons from "./UserListButtons";
import Link from "next/link";
import Image from "next/image";

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
    <section className="p-4 bg-gray-900 rounded-lg shadow-lg">
      <p className="text-2xl">Your List</p>
      {userList.length > 0 && (
        <p className="mb-4 text-sm text-gray-400">
          {`${userList.length}/10 movies added`}
        </p>
      )}

      {/* Numbered List */}
      <ol className="space-y-4">
        {moviesToDisplay.map((movie, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 transition-all duration-200 bg-gray-800 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-700"
          >
            {/* Left Side: Number, Poster, and Title */}
            <div className="flex items-center flex-1 gap-4">
              {/* Number */}
              <span className="text-lg font-bold text-gray-400">
                {index + 1}.
              </span>

              {/* Poster */}
              {userList.length > 0 && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={50}
                  height={75}
                  className="rounded-md shadow-md"
                />
              )}

              {/* Title */}
              {userList.length > 0 ? (
                <Link
                  href={`/movies/${movie.id}`}
                  className="text-sm font-semibold text-gray-100 sm:text-lg hover:text-amber-400"
                >
                  {movie.title}
                </Link>
              ) : (
                <span className="text-sm text-gray-400 sm:text-lg">
                  {movie}
                </span>
              )}
            </div>

            {/* Right Side: Controls */}
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
