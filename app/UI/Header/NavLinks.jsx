"use client";

import React from "react";
import Link from "next/link";
import { useYear } from "@/app/context/YearContext";

const HeaderNavBar = () => {
  const { selectedYear } = useYear();

  return (
    <ul className="flex gap-6 text-lg font-semibold">
      <Link
        className="hover:font-bold hover:underline-offset-2 hover:underline"
        href={`/movies?year=${selectedYear}`}
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
    </ul>
  );
};

export default HeaderNavBar;
