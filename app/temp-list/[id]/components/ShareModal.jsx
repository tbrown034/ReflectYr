"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import { FaTwitter, FaFacebook, FaEnvelope, FaDownload } from "react-icons/fa"; // Import social icons
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
    const url = "https://your-app.com/share"; // Replace with your app's shareable link
    const text = `Check out my top movies of 2024: ${listTitle}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleShareFacebook = () => {
    const url = "https://your-app.com/share"; // Replace with your app's shareable link
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
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <DialogTitle className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Share Your List
          </DialogTitle>
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-center">{listTitle}</h2>
            <div
              id="shareable-grid"
              className={`grid gap-3 ${
                movies.length > 6 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"
              } mt-4`}
            >
              {movies.slice(0, 10).map((movie, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={100}
                    height={150}
                    className="rounded-md"
                  />
                  <p className="mt-1 text-xs">{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Share Links */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between gap-2">
              <button
                onClick={handleShareTwitter}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                <FaTwitter className="w-4 h-4" />
                Share on Twitter
              </button>
              <button
                onClick={handleShareFacebook}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded hover:bg-blue-800"
              >
                <FaFacebook className="w-4 h-4" />
                Share on Facebook
              </button>
            </div>
            <div className="flex justify-between gap-2">
              <button
                onClick={handleSendEmail}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded bg-amber-500 hover:bg-amber-600"
              >
                <FaEnvelope className="w-4 h-4" />
                Email My List
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
                {isDownloading ? "Downloading..." : "Download Image"}
              </button>
            </div>
          </div>
          {/* Close Button */}
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
