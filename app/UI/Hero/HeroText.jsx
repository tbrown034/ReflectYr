import { roboto_mono, inter, rubik } from "../../fonts/fonts.js";

const HeroText = () => {
  return (
    <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
      {/* Main Heading */}
      <h1
        className={`text-5xl font-extrabold leading-tight md:text-6xl ${rubik.className} `}
      >
        <span className="text-amber-600 dark:text-amber-400 ">ReflectYr:</span>{" "}
        <br className="hidden md:block" />
        <span className={`text-gray-800 dark:text-gray-200 ${inter.className}`}>
          Your Year in Film In Review
        </span>
      </h1>

      {/* Subheading */}
      <p
        className={`mx-auto text-lg  text-gray-800 dark:text-gray-200 md:text-xl md:mx-0 ${roboto_mono.className}`}
      >
        Celebrate your year. Curate your favorite movies from the past 12
        months. Build your list and share it with friends—or just reflect for
        yourself.
      </p>
    </div>
  );
};

export default HeroText;
