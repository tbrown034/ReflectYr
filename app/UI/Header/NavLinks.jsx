import React from "react";
import Link from "next/link";

const HeaderNavBar = () => {
  return (
    <ul className="flex gap-6 text-lg font-semibold ">
      <Link
        className="hover:font-bold hover:underline-offset-2 hover:underline"
        href="/movies"
      >
        Movies
      </Link>
      <Link
        className="hover:font-bold hover:underline-offset-2 hover:underline"
        href="/tv"
      >
        TV
      </Link>
      <Link
        className="hover:font-bold hover:underline-offset-2 hover:underline"
        href="/about"
      >
        About
      </Link>
      {/* <Link className=" hover:underline underline-offset-2" href="/music">
        Music
      </Link> */}
    </ul>
  );
};

export default HeaderNavBar;
