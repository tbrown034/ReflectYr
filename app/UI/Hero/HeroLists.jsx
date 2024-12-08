import Link from "next/link";

const HeroLists = ({ currentYear }) => {
  const topLists = [
    { href: "/movies", label: "Your Top Movies" },
    { href: "/tv-shows", label: "Your Top TV Shows" },
    { href: "/music", label: "Your Top Music" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-gray-800">
        Make Your Lists Now
      </h3>
      <div className="flex flex-wrap gap-4">
        {topLists.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex gap-2 px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
          >
            <p>{item.label}</p> ({currentYear})
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroLists;
