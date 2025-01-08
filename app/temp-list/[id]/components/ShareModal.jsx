"use client";

import Image from "next/image";
import ShareLinks from "./ShareLinks";
import html2canvas from "html2canvas";

export default function ShareModal({ listTitle, movies, onClose }) {
  const handleDownloadImage = async () => {
    const element = document.getElementById("shareable-grid");
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = `${listTitle.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose} // Close modal on clicking outside
    >
      <div
        className="relative w-full max-w-lg p-3 bg-white rounded-lg shadow-lg dark:bg-gray-800 md:max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Shareable Content */}
        <div
          id="shareable-grid"
          className="flex flex-col items-center gap-2 p-3 bg-gray-100 rounded-lg dark:bg-gray-900 max-h-[75vh] overflow-hidden"
        >
          {/* Title */}
          <h2 className="text-base font-bold text-center text-gray-800 sm:text-lg dark:text-gray-100">
            {listTitle}
          </h2>

          {/* Movies Grid */}
          <div
            className={`grid gap-3 ${
              movies.length > 6 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"
            }`}
          >
            {movies.slice(0, 10).map((movie, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center gap-2 text-center"
              >
                {/* Ranking Number as Circular Badge */}
                <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 rounded-full shadow-md top-1 left-1 sm:w-8 sm:h-8 sm:text-sm dark:bg-amber-400">
                  {index + 1}
                </div>

                {/* Movie Poster */}
                <div className="h-10 overflow-hidden rounded-md shadow-md sm:h-14 md:h-28 ">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={150}
                    height={225}
                    className="object-cover"
                  />
                </div>

                {/* Movie Title */}
                <p className="mt-1 text-xs font-semibold text-gray-700 sm:text-sm dark:text-gray-200">
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Share Links */}
        <ShareLinks
          listTitle={listTitle}
          onDownloadImage={handleDownloadImage}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
