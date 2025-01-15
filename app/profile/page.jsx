import { auth } from "@/auth";
import { db } from "@/lib/db";
import { fetchMovieDetails } from "@/app/api/movies";
import UserLists from "./UserLists";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import SignOut from "../UI/components/SignOut";
import Link from "next/link";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-gray-900 bg-gray-300 dark:bg-gray-900 dark:text-gray-200">
        <h1 className="mb-4 text-4xl font-extrabold text-amber-500">
          Welcome to ReflectYr
        </h1>
        <p className="mb-6 text-lg text-gray-800 dark:text-gray-300">
          Please sign in to access your profile or continue as a guest.
        </p>
      </div>
    );
  }

  const user = session.user;

  // Fetch lists
  const lists = await db.sql`
    SELECT * FROM lists WHERE user_id = ${user.id} ORDER BY created_at DESC;
  `;

  // Fetch list items and resolve movie titles
  const listsWithItems = await Promise.all(
    lists.rows.map(async (list) => {
      const listItems = await db.sql`
        SELECT tmdb_id, position FROM list_items
        WHERE list_id = ${list.list_id}
        ORDER BY position ASC LIMIT 10;
      `;

      const itemsWithTitles = await Promise.all(
        listItems.rows.map(async (item) => {
          const movie = await fetchMovieDetails(item.tmdb_id);
          return { ...item, title: movie.title };
        })
      );

      return { ...list, items: itemsWithTitles };
    })
  );

  return (
    <div className="flex flex-col items-center min-h-screen p-8 text-gray-900 bg-gray-300 dark:bg-gray-900 dark:text-gray-200">
      <div className="w-full max-w-4xl p-6 text-center">
        <UserCircleIcon className="w-20 h-20 mx-auto text-amber-400" />
        <h1 className="mt-4 text-4xl font-extrabold text-amber-500">
          Welcome, {user.name}!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Account created: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="w-full max-w-4xl p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
          Your Lists
        </h2>
        <UserLists initialLists={listsWithItems} />
      </div>

      <div className="mt-6 space-y-4">
        <Link
          href="/movies"
          className="w-full px-4 py-2 font-semibold text-center text-gray-900 bg-green-500 rounded hover:bg-green-600"
        >
          Create New List
        </Link>
        <div className="w-full px-4 py-2 font-semibold text-center text-gray-900 bg-red-500 rounded hover:bg-red-600">
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
