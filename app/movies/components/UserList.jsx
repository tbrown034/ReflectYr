// Location: app/movies/components/UserList.jsx
// Type: Client Component
// Purpose: Allows users to manage their top 10 movies (add, reorder, or remove).

"use client";

import { useState } from "react";
import UserListControls from "./UserlistControls";

export default function UserList() {
  // Initialize state with placeholder movies or an empty list
  const [movies, setMovies] = useState([
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
  ]);

  // Helper functions for list manipulation
  const moveUp = (index) => {
    if (index === 0) return; // Can't move up if at the top
    const updatedMovies = [...movies];
    [updatedMovies[index - 1], updatedMovies[index]] = [
      updatedMovies[index],
      updatedMovies[index - 1],
    ];
    setMovies(updatedMovies);
  };

  const moveDown = (index) => {
    if (index === movies.length - 1) return; // Can't move down if at the bottom
    const updatedMovies = [...movies];
    [updatedMovies[index + 1], updatedMovies[index]] = [
      updatedMovies[index],
      updatedMovies[index + 1],
    ];
    setMovies(updatedMovies);
  };

  const removeMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  return (
    <section className="mt-6">
      <h2 className="mb-4 text-2xl font-bold">Your Top 10 Movies</h2>
      <ol className="list-decimal list-inside">
        {movies.map((movie, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-4 py-2 border-b group"
          >
            <span className="flex-1">{movie}</span>
            {/* Add UserListControls for each item */}
            <div className="transition opacity-75 group-hover:opacity-100">
              <UserListControls
                onMoveUp={index > 0 ? () => moveUp(index) : null} // Disable if at the top
                onMoveDown={
                  index < movies.length - 1 ? () => moveDown(index) : null
                } // Disable if at the bottom
                onRemove={() => removeMovie(index)}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
