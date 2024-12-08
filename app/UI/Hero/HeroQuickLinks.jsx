import Link from "next/link";

const HeroQuickLinks = () => {
  // Calculate the current year dynamically
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/movies", label: "Your Top Movies" },
    { href: "/tv-shows", label: "Your Top TV Shows" },
    { href: "/music", label: "Your Top Music" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">
        Or Just Start List Making Now! (No Sign in Required!)
      </h3>
      <div className="flex flex-wrap gap-4">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex gap-2 px-4 py-2 text-black transition border-2 border-black rounded hover:bg-black hover:text-white"
          >
            <p>{link.label}</p> ({currentYear})
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroQuickLinks;
