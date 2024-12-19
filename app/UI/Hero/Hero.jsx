import HeroText from "./HeroText";
import HeroImage from "./HeroImage";
import SignInAndOut from "../components/SignInAndOut";
import Link from "next/link";
import HeroBubbles from "./HeroBubbles";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-12 p-6 bg-gray-900 md:items-start">
      {/* Hero Text */}
      <HeroText />

      {/* Call-to-Actions */}
      <div className="flex flex-col w-full gap-4 md:flex-row md:justify-start">
        {/* Sign In Button */}
        <div className="flex items-center justify-center px-6 py-3 font-semibold text-white transition border rounded-lg shadow-lg bg-gradient-to-r from-amber-500 to-orange-400 hover:border-4 hover:from-amber-500 hover:to-orange-500">
          <SignInAndOut />
        </div>

        {/* Get Started Button */}
        <Link
          href="/get-started"
          className="flex items-center justify-center px-6 py-3 font-semibold text-gray-900 transition bg-gray-200 border-2 rounded-lg shadow-lg hover:border-4 border-amber-400 hover:bg-gray-300"
        >
          Get Started with Your Lists
        </Link>
      </div>

      {/* Hero Bubbles */}
      <HeroBubbles />

      {/* Hero Image */}
      <HeroImage />
    </div>
  );
};

export default Hero;
