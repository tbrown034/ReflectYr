import Image from "next/image";
import movieImage from "../../../public/movies2.webp";
// import musicImage from "../../../public/music2.webp";
import tvImage from "../../../public/tv.webp";
// import bookImage from "../../../public/books.webp";

const HeroImage = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Image
        src={movieImage}
        alt="A visual metaphor representing reflection and curation for the year"
        width={500}
        className="border-2 rounded-lg shadow-md hover:scale-95 border-opacity-30 hover:border-opacity-40 border-amber-200 active:scale-105"
        priority
      />
      {/* <Image
        src={musicImage}
        alt="A visual metaphor representing reflection and curation for the year"
        width={300}
        className="border-2 rounded-lg shadow-md hover:scale-95 border-opacity-30 hover:border-opacity-40 border-amber-200 active:scale-105"
        priority
      /> */}
      <Image
        src={tvImage}
        alt="A visual metaphor representing reflection and curation for the year"
        width={500}
        className="border-2 rounded-lg shadow-md hover:scale-95 border-opacity-30 hover:border-opacity-40 border-amber-200 active:scale-105"
        priority
      />
      {/* <Image
        src={bookImage}
        alt="A visual metaphor representing reflection and curation for the year"
        width={300}
        className="border-2 rounded-lg shadow-md hover:scale-95 border-opacity-30 hover:border-opacity-40 border-amber-200 active:scale-105"
        priority
      /> */}
    </div>
  );
};

export default HeroImage;
