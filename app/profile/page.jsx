import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  UserCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import SignOut from "../UI/components/SignOut";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    // If the user is not signed in, prompt them to sign in or continue as a guest
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-gray-900 bg-gray-300 dark:bg-gray-900 dark:text-gray-200">
        <h1 className="mb-4 text-4xl font-extrabold text-amber-500">
          Welcome to ReflectYr
        </h1>
        <p className="mb-6 text-lg text-gray-800 dark:text-gray-300">
          Please sign in to access your profile or continue as a guest.
        </p>
        <div className="grid w-full max-w-md gap-6 p-6 sm:grid-cols-2">
          {/* Sign In */}
          <div className="flex flex-col justify-between p-6 transition bg-gray-600 rounded-lg shadow-md hover:shadow-lg hover:scale-105 group">
            <div className="flex items-center gap-3">
              <UserCircleIcon className="w-8 h-8 text-amber-400" />
              <h3 className="text-xl font-bold text-gray-100 transition border-b-2 border-transparent group-hover:text-amber-400 group-hover:border-amber-400">
                Sign In
              </h3>
            </div>
            <p className="mt-2 text-sm text-gray-200">
              Access your saved lists and create new ones.
            </p>
            <button className="w-full px-4 py-2 mt-4 font-semibold text-center text-gray-900 rounded bg-amber-400 hover:bg-amber-500">
              <Link href="/api/auth/signin">Sign In</Link>
            </button>
          </div>

          {/* Continue as Guest */}
          <Link
            href="/"
            className="flex flex-col justify-between p-6 transition bg-gray-700 rounded-lg shadow-md hover:shadow-lg hover:scale-105 group"
          >
            <div className="flex items-center gap-3">
              <ArrowRightCircleIcon className="w-8 h-8 text-amber-400" />
              <h3 className="text-xl font-bold text-gray-100 transition border-b-2 border-transparent group-hover:text-amber-400 group-hover:border-amber-400">
                Continue as Guest
              </h3>
            </div>
            <p className="mt-2 text-sm text-gray-200">
              Explore and create lists without saving them.
            </p>
          </Link>
        </div>
      </div>
    );
  }

  // Fetch the user's data
  const user = session.user;
  const lists = await db.sql`
    SELECT * FROM lists WHERE user_id = ${user.id} ORDER BY created_at DESC;
  `;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-gray-900 bg-gray-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Profile Heading */}
      <div className="w-full max-w-4xl p-6 text-center">
        <UserCircleIcon className="w-20 h-20 mx-auto text-amber-400" />
        <h1 className="mt-4 text-4xl font-extrabold text-amber-500">
          Welcome, {user.name}!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Account created: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* User Lists */}
      <div className="w-full max-w-4xl p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
          Your Lists
        </h2>
        {lists.rows.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-400">
            You have not created any lists yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {lists.rows.map((list) => (
              <Link
                key={list.list_id}
                href={`/profile/lists/${list.list_id}`}
                className="flex flex-col justify-between p-6 transition bg-gray-600 rounded-lg shadow-md hover:shadow-lg hover:scale-105 group"
              >
                <div className="flex items-center gap-3">
                  <ArrowRightCircleIcon className="w-8 h-8 text-amber-400" />
                  <h3 className="text-xl font-bold text-gray-100 transition border-b-2 border-transparent group-hover:text-amber-400 group-hover:border-amber-400">
                    {list.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-gray-200">
                  Created: {new Date(list.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-4">
        <button className="w-full px-4 py-2 font-semibold text-center text-gray-900 bg-green-500 rounded hover:bg-green-600">
          <Link href="/movies">Create New List</Link>
        </button>
        <div className="w-full px-4 py-2 font-semibold text-center text-gray-900 bg-red-500 rounded hover:bg-red-600">
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
