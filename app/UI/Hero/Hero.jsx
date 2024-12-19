import HeroText from "./HeroText";
import HeroImage from "./HeroImage";
import SignInAndOut from "../components/SignInAndOut";
import Link from "next/link";
import HeroBubbles from "./HeroBubbles";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-12 p-6 bg-gray-900 sm:items-start">
      {/* Hero Text */}
      <HeroText />

      {/* Call-to-Actions */}
      <div className="flex justify-center w-full gap-4 sm:justify-start">
        {/* Sign In Button */}
        <div className="flex items-center justify-center px-6 py-3 text-lg font-semibold text-white transition border-2 border-transparent rounded-lg shadow-lg bg-amber-500 hover:border-amber-400 hover:scale-105">
          <SignInAndOut />
        </div>

        {/* Get Started Button */}
        <Link
          href="/get-started"
          className="flex items-center justify-center px-6 py-3 text-lg font-semibold text-white transition bg-gray-700 border-2 border-transparent rounded-lg shadow-lg hover:border-amber-400 hover:bg-gray-600 hover:scale-105"
        >
          Get Started
        </Link>
      </div>

      {/* Hero Bubbles */}
      <HeroImage />
      <HeroBubbles />
    </div>
  );
};

export default Hero;
