"use client";

import { useRouter } from "next/navigation";

export default function UserListSubmit({ userList }) {
  const router = useRouter();

  const handleFinalize = () => {
    const data = encodeURIComponent(JSON.stringify(userList));
    router.push(`/movies/userlist?data=${data}`);
  };

  return (
    <button
      onClick={handleFinalize}
      disabled={userList.length === 0}
      className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:bg-gray-400"
    >
      Finalize
    </button>
  );
}
