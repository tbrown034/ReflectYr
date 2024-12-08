import React from "react";
import Link from "next/link";

const HeaderNavBar = () => {
  return (
    <div>
      <ul className="flex gap-4">
        <Link className=" hover:underline underline-offset-2" href="/movies">
          Movies
        </Link>
        <Link className=" hover:underline underline-offset-2" href="/tv">
          TV
        </Link>
        <Link className=" hover:underline underline-offset-2" href="/music">
          Music
        </Link>
      </ul>
    </div>
  );
};

export default HeaderNavBar;
