import Link from "next/link";
import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

const HeaderBrand = () => {
  return (
    <Link href="/" className="flex gap-2 ">
      <h1>ReflectYr</h1>
      <ClockIcon className="w-6 h-6 text-amber-400" />{" "}
    </Link>
  );
};

export default HeaderBrand;
