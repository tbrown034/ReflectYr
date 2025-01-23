import Logo from "./Logo";
import NavLinks from "./NavLinks";
import DarkModeToggle from "./DarkModeToggle";
import SignIn from "@/app/UI/components/buttons/SignIn";
import Dropdown from "./Dropdown"; // Import the new Dropdown component
import { auth } from "@/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-900 dark:border-gray-200">
      {/* Logo */}
      <Logo />

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex">
        <NavLinks />
      </nav>

      {/* Desktop Actions */}
      <div className="items-center hidden gap-4 sm:flex">
        <DarkModeToggle />
        {session?.user ? (
          <Link
            href="/profile"
            className="flex items-center gap-3 p-2 font-semibold text-gray-900 transition rounded-lg bg-amber-400 hover:bg-amber-500"
          >
            Profile
          </Link>
        ) : (
          <SignIn className="flex items-center gap-3 p-2 font-semibold text-gray-900 transition rounded-lg bg-amber-400 hover:bg-amber-500" />
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="sm:hidden">
        <Dropdown session={session} />
      </div>
    </header>
  );
}
