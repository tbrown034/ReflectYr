"use client";

export default function FinalizedListClient({ movies }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Shareable link copied to clipboard!");
  };

  return (
    <div>
      <ol className="list-decimal list-inside">
        {movies.map((movie, index) => (
          <li key={index} className="mb-2">
            {movie.title}
          </li>
        ))}
      </ol>
      <button
        onClick={handleCopyLink}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-800"
      >
        Copy Shareable Link
      </button>
    </div>
  );
}
