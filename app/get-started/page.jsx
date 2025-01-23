import { auth } from "@/auth";
import Link from "next/link";
import {
  UserCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import SignIn from "@/app/UI/components/SignIn";
export default async function GetStarted() {
  const session = await auth();

  const options = session
    ? [
        {
          title: "Profile",
          description: "View and manage your saved lists.",
          icon: <UserCircleIcon className="w-8 h-8 text-amber-400" />,
          action: "/profile",
        },
        {
          title: "Create New List",
          description: "Start building your lists right away.",
          icon: <ArrowRightCircleIcon className="w-8 h-8 text-amber-400" />,
          action: "/movies",
        },
      ]
    : [
        {
          title: "Sign In",
          description: "Create lists and save them for later.",
          icon: <UserCircleIcon className="w-8 h-8 text-amber-400" />,
          action: null,
        },
        {
          title: "Continue as Guest",
          description: "Create lists (won't be saved).",
          icon: <ArrowRightCircleIcon className="w-8 h-8 text-amber-400" />,
          action: "/movies",
        },
      ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-gray-900 bg-gray-300 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl text-amber-500 dark:text-amber-300">
          Get Started with ReflectYr
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-800 sm:text-xl dark:text-gray-300">
          {session ? (
            <>
              Hi,{" "}
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {session.user.name}
              </span>
              ! <br />
              Pick an option below to begin your journey.
            </>
          ) : (
            "Sign in to save your lists or continue as a guest to explore."
          )}
        </p>
      </div>
      <div className="grid w-full max-w-2xl gap-6 mt-12 sm:grid-cols-2">
        {options.map((option, index) => {
          const isSignIn = option.title === "Sign In" && !session;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-between p-6 transition-transform bg-gray-700 rounded-lg shadow-lg group hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-600 rounded-full">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-amber-400">
                  {option.title}
                </h3>
              </div>
              <p className="mt-4 text-sm text-center text-gray-200">
                {option.description}
              </p>
              {isSignIn ? (
                <div className="w-full mt-6">
                  <SignIn className="w-full px-4 py-2 font-semibold text-center text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500" />
                </div>
              ) : (
                <Link
                  href={option.action || "/"}
                  className="w-full px-4 py-2 mt-6 font-semibold text-center text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
                >
                  {option.title === "Continue as Guest"
                    ? "Start Exploring"
                    : "Go to " + option.title}
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-12 text-xs text-gray-600 dark:text-gray-400">
        By signing in, you agree to our{" "}
        <Link
          href="/about"
          className="underline text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-500"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/about"
          className="underline text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-500"
        >
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
