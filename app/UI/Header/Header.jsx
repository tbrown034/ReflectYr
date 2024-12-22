import HeaderNavBar from "./HeaderNavBar";
import HeaderBrand from "./HeaderBrand";
import HeaderMobileMenu from "./HeaderMobileMenu"; // Client Component

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 ">
      {/* Brand */}
      <HeaderBrand />

      {/* Navigation Bar */}
      <nav className="hidden md:flex md:gap-6">
        <HeaderNavBar />
      </nav>

      {/* Sign-In/Out and Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* Inline Sign-In and Sign-Out Buttons */}
        <div className="hidden gap-4 sm:flex">
          {/* <button
            className="px-4 py-2 text-sm font-medium text-gray-100 rounded-lg bg-amber-500 hover:bg-amber-600"
            onClick={() => signIn("github")}
          >
            Sign In
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={() => signOut()}
          >
            Sign Out
          </button> */}
        </div>

        {/* Mobile Menu */}
        <HeaderMobileMenu className="md:hidden" />
      </div>
    </header>
  );
};

export default Header;
