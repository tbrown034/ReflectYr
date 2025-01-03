import React from "react";
import Link from "next/link";
import { FilmIcon, TvIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";

const HeroBubbles = () => {
  const bubbles = [
    {
      title: "Movies",
      description:
        "Build lists of your favorite movies from the year and share them with others.",
      bgColor: "bg-gray-600",
      icon: <FilmIcon className="w-8 h-8 text-amber-400" />,
      route: "/movies",
    },
    {
      title: "TV Shows",
      description: "Keep track of the shows that kept you hooked this year.",
      bgColor: "bg-gray-700",
      icon: <TvIcon className="w-8 h-8 text-amber-400" />,
      route: "/tv",
    },
    // {
    //   title: "Music",
    //   description: "Reflect on the tracks and albums that defined your year.",
    //   bgColor: "bg-gray-800",
    //   icon: <MusicalNoteIcon className="w-8 h-8 text-amber-400" />,
    //   route: "/music",
    // },
  ];

  return (
    <div className="flex flex-col w-full gap-6 sm:flex-row sm:justify-start">
      {bubbles.map((bubble, index) => (
        <Link
          key={index}
          href={bubble.route}
          className={`flex flex-col justify-start p-6 ${bubble.bgColor} rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 group`}
        >
          <div className="flex items-center gap-3">
            {bubble.icon}
            <h3 className="text-xl font-bold text-gray-100 transition border-b-2 border-transparent group-hover:text-amber-400 group-hover:border-amber-400">
              {bubble.title}
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-200">{bubble.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default HeroBubbles;
