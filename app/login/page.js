import React from "react";
import Link from "next/link";

const login = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold">Log In</h1>
      <h3>This is the part where you log in or register.</h3>
      <Link
        className="px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
        href="/"
      >
        Back to home
      </Link>
    </div>
  );
};

export default login;
