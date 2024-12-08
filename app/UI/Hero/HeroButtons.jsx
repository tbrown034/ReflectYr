import Link from "next/link";

const HeroButtons = () => {
  const primaryLinks = [
    { href: "/movies", label: "Get Started" },
    { href: "/login", label: "Log In" },
  ];

  return (
    <div className="flex gap-4">
      {primaryLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="px-4 py-2 text-xl font-bold text-black transition border-2 border-black rounded-xl hover:bg-black hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default HeroButtons;
