import { auth } from "@/auth";
import Link from "next/link";
import SignIn from "../UI/components/SignIn.jsx";

export default async function GetStarted() {
  // Fetch the session server-side
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 bg-gray-900">
      <div className="w-full max-w-4xl p-6 space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-amber-400 sm:text-5xl">
          Welcome to ReflectYr
        </h1>
        <p className="text-lg leading-relaxed text-gray-300 sm:text-xl">
          {session
            ? `Hi, ${session.user.name}! Choose how you'd like to get started.`
            : "Sign in to save your lists or continue as a guest to start exploring."}
        </p>
      </div>

      <div className="grid w-full max-w-md gap-6 p-6 text-center sm:grid-cols-2 sm:max-w-2xl">
        {session ? (
          <Link
            href="/profile"
            className="flex flex-col items-center justify-center p-6 space-y-3 transition bg-gray-800 rounded-lg shadow-lg hover:scale-105 hover:bg-gray-700"
          >
            <span className="text-2xl font-bold text-amber-400">Profile</span>
            <p className="text-sm text-gray-400">
              View and manage your saved lists.
            </p>
          </Link>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 space-y-3 transition bg-gray-800 rounded-lg shadow-lg hover:scale-105 hover:bg-gray-700">
            <SignIn className="text-2xl font-bold text-amber-400" />
            <p className="text-sm text-gray-400">
              Create lists and save them for later!
            </p>{" "}
          </div>
        )}
        {session ? (
          <Link
            href="/movies"
            className="flex flex-col items-center justify-center p-6 space-y-3 transition bg-gray-800 rounded-lg shadow-lg hover:scale-105 hover:bg-gray-700"
          >
            <span className="text-2xl font-bold text-amber-400">
              Make Lists
            </span>
            <p className="text-sm text-gray-400">
              Start building your lists right away.
            </p>
          </Link>
        ) : (
          <Link
            href="/movies"
            className="flex flex-col items-center justify-center p-6 space-y-3 transition bg-gray-800 rounded-lg shadow-lg hover:scale-105 hover:bg-gray-700"
          >
            <span className="text-2xl font-bold text-amber-400">
              Continue as Guest
            </span>
            <p className="text-sm text-gray-400">
              Create lists (won't be saved).
            </p>
          </Link>
        )}
      </div>
      <p className="mt-12 text-xs text-gray-500">
        By signing in, you agree to our{" "}
        <a
          href="/terms"
          className="underline text-amber-400 hover:text-amber-500"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="underline text-amber-400 hover:text-amber-500"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
