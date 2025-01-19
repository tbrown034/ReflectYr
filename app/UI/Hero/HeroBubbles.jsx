import React from "react";
import Link from "next/link";
import { MdMovie, MdTv } from "react-icons/md";

const HeroBubbles = () => {
  const bubbles = [
    {
      title: "Movies",
      description:
        "Dive into the best films of the year. Organize, rank, and share your favorites.",
      icon: <MdMovie className="w-10 h-10 text-gray-900 dark:text-gray-200" />,
      route: "/movies",
    },
    {
      title: "TV Shows",
      description:
        "Keep track of the TV series you loved this year. Build and share custom lists.",
      icon: <MdTv className="w-10 h-10 text-gray-900 dark:text-gray-200" />,
      route: "/tv",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {bubbles.map((bubble, index) => (
        <Link
          key={index}
          href={bubble.route}
          className="flex flex-col justify-between p-6 transition border-4 border-gray-400 rounded-lg shadow-xl group hover:shadow-lg hover:-translate-y-1 dark:border-gray-700"
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
              {bubble.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 group-hover:text-gray-700 dark:group-hover:text-gray-100">
              {bubble.title}
            </h3>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {bubble.description}
          </p>

          {/* Action */}
          <div className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-200 group-hover:underline">
            Explore {bubble.title} →
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HeroBubbles;
