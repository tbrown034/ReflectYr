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
      onClick={onClose} // Closes the modal on clicking outside
    >
      <div
        className="relative max-h-[90vh] w-full max-w-md p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 md:max-w-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Shareable Content */}
        <div
          id="shareable-grid"
          className="flex flex-col items-center gap-4 p-4 overflow-y-auto bg-gray-100 rounded-lg dark:bg-gray-900 max-h-[60vh]"
        >
          {/* Title */}
          <h2 className="text-lg font-bold text-center text-gray-800 sm:text-xl dark:text-gray-100">
            {listTitle}
          </h2>

          {/* Movies Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {movies.slice(0, 10).map((movie, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 text-center"
              >
                {/* Ranking Number */}
                <div className="text-sm font-bold text-blue-500 sm:text-base dark:text-amber-400">
                  {index + 1}
                </div>

                {/* Movie Poster */}
                <div className="w-20 overflow-hidden rounded-md shadow-md h-28 sm:w-24 sm:h-36">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={150}
                    height={225}
                    className="object-cover"
                  />
                </div>

                {/* Movie Title */}
                <p className="text-xs font-semibold text-gray-700 sm:text-sm dark:text-gray-200">
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
