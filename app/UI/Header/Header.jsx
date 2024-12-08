import HeaderNavBar from "./HeaderNavBar";
import HeaderBrand from "./HeaderBrand";
import HeaderLogInProfileToggle from "./HeaderLogInProfileToggle";
import HeaderDarkToggle from "./HeaderDarkToggle";
import HeaderMobileMenu from "./HeaderMobileMenu"; // Client Component

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
      {/* Left Section: Brand */}
      <HeaderBrand />

      {/* Center Section: Full Navbar (Hidden on Mobile) */}
      <nav className="hidden gap-6 md:flex">
        <HeaderNavBar />
      </nav>

      {/* Right Section: Log In/Profile and Dark Toggle (Hidden on Mobile) */}
      <div className="items-center hidden gap-4 md:flex">
        <HeaderLogInProfileToggle />
        <HeaderDarkToggle />
      </div>

      {/* Mobile Menu (Client Component) */}
      <HeaderMobileMenu />
    </header>
  );
};

export default Header;
