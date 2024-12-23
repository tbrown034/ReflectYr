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
    <section className="p-4 rounded-lg shadow-lg">
      <h1 className="text-lg font-bold text-amber-400">Your List</h1>
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
            className="p-4 transition-all duration-200 bg-gray-900 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-700"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left Section: Number, Poster, Title */}
              <Link
                href={userList.length > 0 ? `/movies/${movie.id}` : "#"}
                className="flex items-center flex-1 gap-4"
              >
                {/* Number */}
                {userList.length > 0 && (
                  <span className="text-lg font-bold text-gray-400">
                    {index + 1}.
                  </span>
                )}

                {/* Poster */}
                {userList.length > 0 ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={80}
                    height={120}
                    className="flex-shrink-0 rounded-md shadow-md"
                  />
                ) : (
                  <div className="w-[80px] h-[120px] bg-gray-700 rounded-md" />
                )}

                {/* Title */}
                {userList.length > 0 ? (
                  <p className="text-sm font-semibold text-gray-100 sm:text-lg hover:text-amber-400">
                    {movie.title}
                  </p>
                ) : (
                  <span className="text-sm text-gray-400 sm:text-lg">
                    {movie}
                  </span>
                )}
              </Link>

              {/* Right Section: Controls */}
              {userList.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 sm:mt-0 sm:ml-4 sm:flex-nowrap">
                  <UserListControls
                    onMoveUp={index > 0 ? () => moveUp(index) : null}
                    onMoveDown={
                      index < userList.length - 1 ? () => moveDown(index) : null
                    }
                    onRemove={() => removeMovie(movie.id)}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* Clear and Submit Buttons */}
      <UserListButtons userList={userList} setUserList={setUserList} />
    </section>
  );
}
