import React from "react";
import Link from "next/link";

const movies = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold">Movies</h1>
      <h3>Select Your Top Movies of the Year!</h3>
      <Link
        className="px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
        href="/"
      >
        Back to home
      </Link>
    </div>
  );
};

export default movies;
