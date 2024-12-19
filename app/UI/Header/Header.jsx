import HeaderNavBar from "./HeaderNavBar";
import HeaderBrand from "./HeaderBrand";
import HeaderMobileMenu from "./HeaderMobileMenu"; // Client Component
import SignInAndOut from "../components/SignInAndOut";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 ">
      <HeaderBrand />
      <nav className="hidden md:flex md:gap-6">
        <HeaderNavBar />
      </nav>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <SignInAndOut />
        </div>
        <HeaderMobileMenu className="md:hidden" />
      </div>
    </header>
  );
};

export default Header;
