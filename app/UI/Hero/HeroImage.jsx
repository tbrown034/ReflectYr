import Image from "next/image";

const HeroImage = () => {
  return (
    <Image
      src="https://picsum.photos/600/300"
      alt="A visual metaphor representing reflection and curation for the year"
      width={600}
      height={200}
      className="rounded-lg shadow-md"
      priority
    />
  );
};

export default HeroImage;
