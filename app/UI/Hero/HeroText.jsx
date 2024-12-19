const HeroText = () => {
  return (
    <div className="flex flex-col items-center gap-10 text-center md:items-start md:text-left">
      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
        <span className="text-amber-400">ReflectYr:</span>{" "}
        <br className="hidden md:block" />
        <span className="text-white">Your Year in Review</span>
      </h1>

      {/* Subheading */}
      <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-300 md:text-xl md:mx-0">
        Celebrate your year. Curate your favorite movies, TV shows, music, and
        books from the past 12 months. Build your list and share it with
        friends—or just reflect for yourself.
      </p>
    </div>
  );
};

export default HeroText;
