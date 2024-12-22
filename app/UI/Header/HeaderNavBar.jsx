import React from "react";
import Link from "next/link";

const HeaderNavBar = () => {
  return (
    <ul className="flex gap-4">
      <Link className="" href="/movies">
        Movies
      </Link>
      <Link className="" href="/tv">
        TV
      </Link>
      {/* <Link className=" hover:underline underline-offset-2" href="/music">
        Music
      </Link> */}
    </ul>
  );
};

export default HeaderNavBar;
