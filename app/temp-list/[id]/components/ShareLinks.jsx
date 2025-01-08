"use client";

import { useState } from "react";

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
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
      <button
        onClick={handleShareTwitter}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Share on Twitter
      </button>
      <button
        onClick={handleShareFacebook}
        className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Share on Facebook
      </button>
      <button
        onClick={handleSendEmail}
        className="px-4 py-2 text-white rounded-lg bg-amber-500 hover:bg-amber-600"
      >
        Email My List
      </button>
      <button
        onClick={handleDownloadClick}
        disabled={isDownloading}
        className={`px-4 py-2 text-white bg-green-500 rounded-lg ${
          isDownloading ? "cursor-not-allowed opacity-50" : "hover:bg-green-600"
        }`}
      >
        {isDownloading ? "Downloading..." : "Download Image"}
      </button>
      <button
        onClick={onClose}
        className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
      >
        Close
      </button>
    </div>
  );
}
