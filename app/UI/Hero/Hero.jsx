// components/Hero.jsx
import { auth } from "@/auth";
import HeroText from "./HeroText";
import Link from "next/link";
import HeroBubbles from "./HeroBubbles";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import SignIn from "../../UI/components/SignIn";
import ScrollingMovies from "./ScrollingMovies";
import ScrollingShows from "./ScrollingShows";
import YearHolder from "./YearHolder";
export default async function Hero() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-12 p-4">
      {/* Hero Text */}
      <div className="flex flex-col gap-6">
        <HeroText />

        {/* Call-to-Actions */}
        <div className="flex gap-6">
          {/* Conditional Rendering for Profile or SignIn */}
          {session ? (
            <Link
              href="/profile"
              className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-gray-900 transition rounded-lg bg-amber-400 hover:bg-amber-500"
            >
              Profile
            </Link>
          ) : (
            <SignIn className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-gray-900 transition border-4 rounded-lg shadow-xl hover:scale-105 border-amber-400 bg-amber-400 hover:bg-amber-500" />
          )}

          {/* Get Started Button */}
          <Link
            href="/get-started"
            className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-gray-200 transition bg-gray-700 border-2 border-transparent rounded-lg shadow-lg hover:bg-gray-600 hover:scale-105"
          >
            <span>Get Started</span>
            <ArrowRightCircleIcon className="w-6 h-6 text-amber-400" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <ScrollingMovies />
        <ScrollingShows />
      </div>
      <div className="flex items-center justify-center">
        <YearHolder />
      </div>
      {/* Hero Bubbles */}
      <HeroBubbles />
    </div>
  );
}
