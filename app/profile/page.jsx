import { auth } from "@/auth";
import { db } from "@/lib/db";
import { fetchMovieDetails } from "@/app/api/movies";
import UserLists from "./UserLists";
import { UserCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import SignOut from "../UI/components/SignOut";
import Link from "next/link";

const ProfilePage = async () => {
  const session = await auth();

  // If user is not signed in
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
        <h1 className="mb-4 text-4xl font-extrabold text-amber-500">
          Welcome to ReflectYr
        </h1>
        <p className="mb-6 text-lg text-gray-800 dark:text-gray-300">
          Please sign in to access your profile or continue as a guest.
        </p>
        <Link
          href="/"
          className="px-6 py-3 text-sm font-semibold text-white rounded-lg bg-amber-500 hover:bg-amber-600"
        >
          Go to Home
        </Link>
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
          return {
            ...item,
            title: movie.title,
            poster_path: movie.poster_path,
          };
        })
      );

      return { ...list, items: itemsWithTitles };
    })
  );

  return (
    <div className="flex flex-col items-center min-h-screen p-8 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
      {/* User Header */}
      <div className="w-full max-w-4xl mb-8 text-center">
        <UserCircleIcon className="w-20 h-20 mx-auto text-amber-400" />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Welcome, <span className="text-amber-500">{user.name}</span>!
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Account created: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Your Lists Section */}
      <div className="w-full max-w-4xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
          Your Lists
        </h2>

        {/* Render User Lists */}
        {listsWithItems.length > 0 ? (
          <UserLists initialLists={listsWithItems} />
        ) : (
          <div className="p-6 text-center bg-gray-200 rounded-lg dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You haven’t created any lists yet. Start by creating a new one!
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col w-full max-w-4xl gap-4 mt-6 md:flex-row">
        {/* Create New List Button */}
        <Link
          href="/movies"
          className="flex items-center justify-center w-full gap-2 px-6 py-3 text-lg font-semibold text-white rounded-lg bg-amber-500 hover:bg-amber-600"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Create New List
        </Link>

        {/* Sign Out Button */}
        <div className="flex items-center justify-center w-full gap-2 px-6 py-3 text-lg font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800">
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
