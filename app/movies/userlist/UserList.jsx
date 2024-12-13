"use client";

import UserListControls from "./UserListControls";
import UserListSubmit from "./UserListSubmit";

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
    <section className="p-2">
      <h2 className="mb-4 text-2xl font-bold">Your Top 10</h2>
      {userList.length > 0 && (
        <p className="mb-4 text-sm text-gray-600">
          {`${userList.length}/10 movies added`}
        </p>
      )}
      <ol className="list-decimal list-inside">
        {moviesToDisplay.map((movie, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-4 py-2 border-b group"
          >
            <span className="flex-1">
              {userList.length > 0 ? movie.title || movie : movie}
            </span>

            {userList.length > 0 && (
              <div className="transition opacity-75 group-hover:opacity-100">
                <UserListControls
                  onMoveUp={index > 0 ? () => moveUp(index) : null}
                  onMoveDown={
                    index < userList.length - 1 ? () => moveDown(index) : null
                  }
                  onRemove={() => removeMovie(movie.id)}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
      <UserListSubmit userList={userList} setUserList={setUserList} />
    </section>
  );
}
