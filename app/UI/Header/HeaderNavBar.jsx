import React from "react";
import Link from "next/link";

const HeaderNavBar = () => {
  return (
    <div>
      <ul className="flex gap-4">
        <Link href="/movies">Movies</Link>
        <Link href="/tv">TV</Link>
        <Link href="/music">Music</Link>
      </ul>
    </div>
  );
};

export default HeaderNavBar;
