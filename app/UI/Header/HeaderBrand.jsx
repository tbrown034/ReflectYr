import Link from "next/link";
import React from "react";
import { ClockIcon } from "@/components/heroicons";

const HeaderBrand = () => {
  return (
    <Link href="/" className="flex gap-2 hover:underline underline-offset-2">
      <h1>ReflectYr</h1>
      <ClockIcon className="w-6 h-6 text-amber-400" />{" "}
    </Link>
  );
};

export default HeaderBrand;
