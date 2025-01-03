// components/Hero.jsx
import { auth } from "@/auth";
import HeroText from "./HeroText";
import Link from "next/link";
import HeroBubbles from "./HeroBubbles";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import SignIn from "../../UI/components/SignIn";

export default async function Hero() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center gap-12 p-6 dark:bg-gray-900 sm:items-start">
      <HeroText />
      <div className="flex justify-center w-full gap-4 sm:justify-start">
        {session ? (
          <Link
            href="/profile"
            className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
          >
            Profile
          </Link>
        ) : (
          <SignIn className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500" />
        )}
        <Link
          href="/get-started"
          className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-gray-200 transition bg-gray-700 border-2 border-transparent rounded-lg shadow-lg hover:bg-gray-600 hover:scale-105"
        >
          <span>Get Started</span>
          <ArrowRightCircleIcon className="w-6 h-6 text-amber-400" />
        </Link>
      </div>
      <HeroBubbles />
    </div>
  );
}
