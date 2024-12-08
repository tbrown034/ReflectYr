import HeroText from "./HeroText";
import HeroButtons from "./HeroButtons";
import HeroImage from "./HeroImage";
import HeroQuickLinks from "./HeroQuickLinks";

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <HeroText />
      <HeroButtons />
      <HeroImage />
      <HeroQuickLinks />
    </div>
  );
};

export default Hero;
