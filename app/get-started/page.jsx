import { auth } from "@/auth";
import Link from "next/link";
import {
  UserCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import SignIn from "@/app/UI/components/SignIn"; // Reuse your existing SignIn component

export default async function GetStarted() {
  const session = await auth();

  // Define options based on session state
  const options = session
    ? [
        {
          title: "Profile",
          description: "View and manage your saved lists.",
          bgColor: "bg-gray-600",
          icon: <UserCircleIcon className="w-8 h-8 text-amber-400" />,
          action: "/profile",
          isLink: true,
        },
        {
          title: "Create New List",
          description: "Start building your lists right away.",
          bgColor: "bg-gray-700",
          icon: <ArrowRightCircleIcon className="w-8 h-8 text-amber-400" />,
          action: "/movies",
          isLink: true,
        },
      ]
    : [
        {
          title: "Sign In",
          description: "Create lists and save them for later.",
          bgColor: "bg-gray-600",
          icon: <UserCircleIcon className="w-8 h-8 text-amber-400" />,
          action: null,
          isLink: false,
        },
        {
          title: "Continue as Guest",
          description: "Create lists (won't be saved).",
          bgColor: "bg-gray-700",
          icon: <ArrowRightCircleIcon className="w-8 h-8 text-amber-400" />,
          action: "/movies",
          isLink: false,
        },
      ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 bg-gray-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Heading Section */}
      <div className="w-full max-w-4xl p-6 space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-amber-500 dark:text-amber-300 sm:text-5xl">
          Get Started with ReflectYr
        </h1>
        <p className="text-2xl leading-relaxed text-gray-800 dark:text-gray-300 sm:text-xl">
          {session ? (
            <>
              Hi,{" "}
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {session.user.name}
              </span>
              !<br />
              Pick an option below to begin your journey.
            </>
          ) : (
            "Sign in to save your lists or continue as a guest to explore."
          )}
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid w-full max-w-md gap-6 p-6 sm:grid-cols-2 sm:max-w-2xl">
        {options.map((option, index) => {
          if (option.title === "Continue as Guest") {
            // Render the "Continue as Guest" card styled like "Sign In"
            return (
              <Link
                key={index}
                href={option.action}
                className={`flex flex-col justify-between p-6 ${option.bgColor} rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 group`}
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <h3 className="text-xl font-bold text-gray-100 transition border-b-2 border-transparent group-hover:text-amber-400 group-hover:border-amber-400">
                    {option.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-gray-200">
                  {option.description}
                </p>
                <button className="w-full px-4 py-2 mt-4 font-semibold text-center text-gray-900 rounded bg-amber-400 hover:bg-amber-500">
                  Make Lists
                </button>
              </Link>
            );
          } else if (option.isLink) {
            // Render other options as link cards
            return (
              <Link
                key={index}
                href={option.action}
                className={`flex flex-col justify-between p-6 ${option.bgColor} rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 group`}
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <h3 className="text-xl font-bold text-gray-100 transition border-b-2 border-transparent group-hover:text-amber-400 group-hover:border-amber-400">
                    {option.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-gray-200">
                  {option.description}
                </p>
              </Link>
            );
          } else {
            // Render the "Sign In" card
            return (
              <div
                key={index}
                className={`flex flex-col justify-between p-6 ${option.bgColor} rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 group`}
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <h3 className="text-xl font-bold text-gray-100 transition border-b-2 border-transparent group-hover:text-amber-400 group-hover:border-amber-400">
                    {option.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-gray-200">
                  {option.description}
                </p>
                <div className="mt-4">
                  <SignIn className="w-full px-4 py-2 font-semibold text-center text-gray-900 rounded bg-amber-400 hover:bg-amber-500" />
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Footer Section */}
      <p className="mt-12 text-xs text-gray-600 dark:text-gray-400">
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
      </p>
    </div>
  );
}
