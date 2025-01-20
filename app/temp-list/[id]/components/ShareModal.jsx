"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import { FaTwitter, FaFacebook, FaEnvelope, FaDownload } from "react-icons/fa";
import { useState } from "react";

export default function ShareModal({ isOpen, onClose, listTitle, movies }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    const element = document.getElementById("shareable-grid");
    if (element) {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });

      const link = document.createElement("a");
      link.download = `${listTitle.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
    setIsDownloading(false);
  };

  const handleShareTwitter = () => {
    const url = "https://your-app.com/share";
    const text = `Check out my top movies of 2024: ${listTitle}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleShareFacebook = () => {
    const url = "https://your-app.com/share";
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleSendEmail = () => {
    const subject = `My Top Movies of 2024: ${listTitle}`;
    const body = `Hey! Check out my top movies of 2024:\n\n${listTitle}\n\nVisit ReflectYr for more!`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg p-6 space-y-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          {/* Title */}
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Share Your List
          </DialogTitle>

          {/* List Title and Movies Grid */}
          <div>
            <h2 className="text-lg font-semibold text-center text-amber-500 dark:text-amber-400">
              {listTitle}
            </h2>
            <div
              id="shareable-grid"
              className={`grid gap-3 mt-4 ${
                movies.length > 6 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"
              }`}
            >
              {movies.slice(0, 10).map((movie, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={100}
                    height={150}
                    className="rounded-md shadow"
                  />
                  <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {movie.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleShareTwitter}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              <FaTwitter className="w-4 h-4" />
              Twitter
            </button>
            <button
              onClick={handleShareFacebook}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded hover:bg-blue-800"
            >
              <FaFacebook className="w-4 h-4" />
              Facebook
            </button>
            <button
              onClick={handleSendEmail}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded bg-amber-500 hover:bg-amber-600"
            >
              <FaEnvelope className="w-4 h-4" />
              Email
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded ${
                isDownloading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              <FaDownload className="w-4 h-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </button>
          </div>

          {/* Close Button */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
