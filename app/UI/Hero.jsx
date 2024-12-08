import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 p-6 ">
      {/* Hero Headings */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold ">ReflectYr: Your Year in Review</h1>
        <h3 className="text-2xl ">
          Celebrate your year. Curate your favorite movies, TV shows, music, and
          books from the past 12 months. Build your list and share it with
          friends—or just reflect for yourself.
        </h3>
      </div>

      {/* Hero Buttons */}
      <div className="flex gap-4">
        <Link
          href="/movies"
          className="px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
        >
          Start Your Movie List
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
        >
          Log In to ReflectYr
        </Link>
      </div>

      {/* Hero Image */}
      <Image
        src="https://picsum.photos/600/300"
        alt="A visual metaphor representing reflection and curation for the year"
        width={600}
        height={300}
        className="rounded-lg shadow-md"
        priority
      />
      <div>
        <Link
          className="px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
          href="/movies"
        >
          Movies
        </Link>
      </div>
    </div>
  );
};

export default Hero;
