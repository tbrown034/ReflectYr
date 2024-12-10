// Location: app/movies/[id]/error.jsx
// Type: Client Component
// Purpose: Provides an error boundary for movie details fetch failures.

"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-gray-700">We couldn’t fetch the movie details.</p>
      <button
        className="px-4 py-2 mt-4 text-white bg-black rounded hover:bg-gray-700"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
