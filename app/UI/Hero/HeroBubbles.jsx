import React from "react";
import Link from "next/link";
import { MdMovie, MdTv } from "react-icons/md";

const HeroBubbles = () => {
  const bubbles = [
    {
      title: "Movies",
      description:
        "Dive into the best films of the year. Organize, rank, and share your favorites.",
      bgColor: "bg-gray-800",
      icon: <MdMovie className="w-12 h-12 text-amber-500" />,
      route: "/movies",
    },
    {
      title: "TV Shows",
      description:
        "Keep track of the TV series you loved this year. Build and share custom lists.",
      bgColor: "bg-gray-800",
      icon: <MdTv className="w-12 h-12 text-amber-500" />,
      route: "/tv",
    },
  ];

  return (
    <div className="flex flex-col w-full gap-6 sm:flex-row sm:gap-8">
      {bubbles.map((bubble, index) => (
        <Link
          key={index}
          href={bubble.route}
          className={`flex flex-col justify-start items-start p-6 rounded-lg shadow-lg transition-transform transform ${bubble.bgColor} hover:shadow-amber-400 hover:-translate-y-1 group`}
        >
          {/* Icon */}
          <div className="mb-4">{bubble.icon}</div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white transition group-hover:text-amber-500">
            {bubble.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {bubble.description}
          </p>

          {/* Action */}
          <div className="mt-4 text-sm font-semibold text-amber-500 group-hover:underline">
            Explore {bubble.title} →
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HeroBubbles;
