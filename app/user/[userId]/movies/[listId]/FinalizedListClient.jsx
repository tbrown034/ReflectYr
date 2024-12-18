"use client";

import { useEffect, useState } from "react";

export default function FinalizedListClient({ userId, listId }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch the finalized list from localStorage
    const storedList = localStorage.getItem(`userList-${userId}-${listId}`);
    if (storedList) {
      setMovies(JSON.parse(storedList));
    } else {
      setMovies([]); // Fallback if no list is found
    }
  }, [userId, listId]);

  return (
    <div>
      {movies.length > 0 ? (
        <ul className="list-disc list-inside">
          {movies.map((movie, index) => (
            <li key={index} className="py-1">
              {movie.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found for this list.</p>
      )}
    </div>
  );
}
