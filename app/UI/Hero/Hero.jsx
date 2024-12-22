import HeroText from "./HeroText";
import Link from "next/link";
import HeroBubbles from "./HeroBubbles";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-12 p-6 bg-gray-900 sm:items-start">
      {/* Hero Text */}
      <HeroText />

      {/* Call-to-Actions */}
      <div className="flex justify-center w-full gap-4 sm:justify-start">
        {/* Sign In Button */}
        <Link
          href="/log-in"
          className="px-6 py-3 text-lg font-semibold text-gray-700 transition border-2 border-transparent rounded-lg shadow-lg bg-amber-400 hover:scale-105"
        >
          Sign In
        </Link>

        {/* Get Started Button */}
        <Link
          href="/get-started"
          className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-gray-200 transition bg-gray-700 border-2 border-transparent rounded-lg shadow-lg hover:bg-gray-600 hover:scale-105"
        >
          <span>Get Started</span>
          <ArrowRightCircleIcon className="w-6 h-6 text-amber-400" />
        </Link>
      </div>

      {/* Hero Bubbles */}
      <HeroBubbles />
    </div>
  );
};

export default Hero;
