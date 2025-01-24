"use client";

import Link from "next/link";
import Image from "next/image";
import UserListControls from "../../UI/components/UserListControls";
import UserListButtons from "../../UI/components/buttons/UserListButtons";

export default function UserList({
  userList,
  setUserList,
  moveUp,
  moveDown,
  removeMovie,
}) {
  return (
    <section className="flex flex-col gap-6 p-4 bg-gray-200 shadow-xl dark:bg-gray-800 rounded-xl">
      <h1 className="text-2xl font-extrabold text-amber-500 dark:text-amber-400">
        Your Temporary List
      </h1>
      <p className="text-sm text-gray-700 dark:text-gray-400">
        Click to confirm your selections. If you are signed in, you can save
        your picks. But anyone is welcome to download or share their lists!
      </p>

      {userList.length > 0 ? (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {`${userList.length}/10 movies added`}
        </p>
      ) : (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Your list is currently empty. Add movies to start building your list.
        </p>
      )}

      {/* Numbered List */}
      <ol className="flex flex-col gap-4 overflow-y-auto">
        {userList.map((movie, index) => (
          <li
            key={movie.id}
            className="p-4 transition-all duration-200 bg-gray-100 rounded-lg shadow-md hover:bg-white hover:shadow-md dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {/*
              Use flex-col on small screens and flex-row on larger screens
              so the controls stack underneath on mobile
              and appear side-by-side otherwise.
            */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Movie Info (Link) */}
              <Link
                href={`/movies/${movie.id}`}
                className="flex items-center gap-4"
              >
                <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
                  {index + 1}.
                </span>
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={80}
                    height={120}
                    className="flex-shrink-0 rounded-md shadow-md"
                  />
                ) : (
                  <div className="w-[80px] h-[120px] bg-gray-300 rounded-md dark:bg-gray-700" />
                )}
                <p className="text-sm font-semibold text-gray-900 sm:text-lg hover:text-amber-500 dark:text-gray-200 dark:hover:text-amber-400">
                  {movie.title}
                </p>
              </Link>

              {/* Controls */}
              <div className="flex justify-center gap-4 sm:mt-0 sm:ml-4">
                <UserListControls
                  onMoveUp={index > 0 ? () => moveUp(index) : null}
                  onMoveDown={
                    index < userList.length - 1 ? () => moveDown(index) : null
                  }
                  onRemove={() => removeMovie(movie.id)}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Clear and Submit Buttons */}
      <div className="mt-6">
        <UserListButtons userList={userList} setUserList={setUserList} />
      </div>
    </section>
  );
}
