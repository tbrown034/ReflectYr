"use client";

import { useState } from "react";
import { FaTwitter, FaFacebook, FaEnvelope, FaDownload } from "react-icons/fa"; // Import appropriate icons

export default function ShareLinks({ listTitle, onDownloadImage, onClose }) {
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    await onDownloadImage();
    setIsDownloading(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-4 text-xs">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={handleShareTwitter}
            className="flex items-center gap-2 p-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <FaTwitter className="w-4 h-4 text-sm" />
            Share on Twitter
          </button>
          <button
            onClick={handleShareFacebook}
            className="flex items-center gap-2 p-2 font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            <FaFacebook className="w-4 h-4" />
            Share on Facebook
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSendEmail}
            className="flex items-center gap-2 p-2 font-semibold text-white rounded-lg bg-amber-500 hover:bg-amber-600"
          >
            <FaEnvelope className="w-4 h-4" />
            Email My List
          </button>
          <button
            onClick={handleDownloadClick}
            disabled={isDownloading}
            className={`flex items-center gap-2 p-2 font-semibold text-white rounded-lg ${
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
      <button
        onClick={onClose}
        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600"
      >
        Close
      </button>
    </div>
  );
}
