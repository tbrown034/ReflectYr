import React from "react";
import SignInAndOut from "../UI/components/SignInAndOut";
import Link from "next/link";
import HeroBubbles from "../UI/Hero/HeroBubbles";

const GetStarted = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 text-gray-100 bg-gray-900">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-amber-400">Get Started</h1>
      <p className="max-w-lg text-center text-gray-300">
        ReflectYr helps you curate your top movies, TV shows, and music from the
        year.
      </p>

      {/* Call-to-Actions */}
      <div className="flex flex-col w-full max-w-md gap-6 ">
        {/* Sign In Option */}
        <div className="flex flex-col items-center justify-center w-full gap-4 p-6 bg-gray-800 border-2 rounded-lg shadow-lg border-amber-400">
          <SignInAndOut />
        </div>

        {/* Guest Option */}
        <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Continue as Guest</h2>
          <p className="text-sm text-gray-400">
            Start creating lists without registering. Your lists will only be
            stored on this device.
          </p>

          <HeroBubbles />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
