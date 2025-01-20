import React from "react";
import Link from "next/link";
import { FilmIcon, TvIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";

const HeroBubbles = () => {
  const bubbles = [
    {
      title: "Movies",
      description:
        "Build lists of your favorite movies from the year and share them with others.",
      icon: <FilmIcon className="w-8 h-8 text-gray-800 dark:text-gray-200" />,
      route: "/movies",
    },
    {
      title: "TV Shows",
      description: "Keep track of the shows that kept you hooked this year.",
      icon: <TvIcon className="w-8 h-8 text-gray-800 dark:text-gray-200" />,
      route: "/tv",
    },
    {
      title: "Music",
      description: "Reflect on the tracks and albums that defined your year.",
      icon: (
        <MusicalNoteIcon className="w-8 h-8 text-gray-800 dark:text-gray-200" />
      ),
      route: "/music",
    },
  ];

  return (
    <div className="flex flex-col w-full gap-6 sm:flex-row sm:justify-start">
      {bubbles.map((bubble, index) => (
        <Link
          key={index}
          href={bubble.route}
          className="flex flex-col justify-start p-6 transition-shadow bg-gray-100 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-200 rounded-full group-hover:bg-gray-300 dark:bg-gray-700 dark:group-hover:bg-gray-600">
              {bubble.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-700 dark:group-hover:text-gray-100">
              {bubble.title}
            </h3>
          </div>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
            {bubble.description}
          </p>
          <div className="mt-4 text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:underline">
            Explore {bubble.title} →
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HeroBubbles;
