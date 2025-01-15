"use client";

import Link from "next/link";

const ViewButton = ({ listId }) => {
  return (
    <Link
      href={`/list/${listId}`}
      className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      View List
    </Link>
  );
};

export default ViewButton;
