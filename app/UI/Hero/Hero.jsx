import HeroText from "./HeroText";
import HeroImage from "./HeroImage";
import HeroQuickLinks from "./HeroQuickLinks";
import SignInAndOut from "../components/SignInAndOut";
const Hero = () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <HeroText />
      <SignInAndOut />
      <HeroImage />
      <HeroQuickLinks />
    </div>
  );
};

export default Hero;
