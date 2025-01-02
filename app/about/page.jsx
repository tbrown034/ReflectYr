export default function AboutPage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 text-gray-100 bg-gray-900">
      <div className="w-full max-w-4xl space-y-12">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-amber-400">
          About ReflectYr
        </h1>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <a href="#about-site" className="transition hover:text-amber-400">
            About the Site
          </a>
          <a href="#about-dev" className="transition hover:text-amber-400">
            About the Developer
          </a>
          <a href="#about-tech" className="transition hover:text-amber-400">
            About the Tech Stack
          </a>
          <a href="#whats-next" className="transition hover:text-amber-400">
            What's Next
          </a>
          <a href="#privacy" className="transition hover:text-amber-400">
            Privacy Policy
          </a>
        </nav>

        {/* Sections */}
        <section id="about-site" className="space-y-4">
          <h2 className="text-2xl font-semibold text-amber-400">
            About the Site
          </h2>
          <p className="text-gray-300">
            ReflectYr is your go-to app for celebrating the movies, TV shows,
            and music that made your year unforgettable. With a focus on
            simplicity, ReflectYr lets you create personalized lists, reorder
            them, and share them as stunning visuals with friends and family.
          </p>
        </section>

        <section id="about-dev" className="space-y-4">
          <h2 className="text-2xl font-semibold text-amber-400">
            About the Developer
          </h2>
          <p className="text-gray-300">
            Hi, I’m Trevor Brown, a junior web developer who loves creating
            intuitive and beautiful web experiences. ReflectYr is my personal
            project to showcase my skills with modern web technologies like
            Next.js, Tailwind CSS, and serverless platforms. When I’m not
            coding, you’ll find me watching movies or exploring the latest tech
            trends.
          </p>
        </section>

        <section id="about-tech" className="space-y-4">
          <h2 className="text-2xl font-semibold text-amber-400">
            About the Tech Stack
          </h2>
          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            <li>
              <strong className="text-gray-100">Next.js (App Router):</strong>{" "}
              For modern, server-rendered pages and API routes.
            </li>
            <li>
              <strong className="text-gray-100">Tailwind CSS:</strong> For a
              clean, responsive, and rapid UI development process.
            </li>
            <li>
              <strong className="text-gray-100">TMDB API:</strong> To fetch
              movie data like top-rated and popular titles.
            </li>
            <li>
              <strong className="text-gray-100">Prisma + PostgreSQL:</strong> To
              manage user data and preferences securely.
            </li>
            <li>
              <strong className="text-gray-100">Vercel:</strong> For a fast and
              scalable hosting solution.
            </li>
            <li>
              <strong className="text-gray-100">NextAuth.js:</strong> To provide
              seamless authentication with Google and GitHub.
            </li>
          </ul>
        </section>

        <section id="whats-next" className="space-y-4">
          <h2 className="text-2xl font-semibold text-amber-400">What's Next</h2>
          <p className="text-gray-300">
            ReflectYr is evolving! Here’s what’s coming soon:
          </p>
          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            <li>Support for TV shows and music list creation.</li>
            <li>
              Advanced sharing options, including social media integrations.
            </li>
            <li>Customizable list themes and layouts for sharing visuals.</li>
            <li>User profiles to view and manage lists from past years.</li>
          </ul>
        </section>

        <section id="privacy" className="space-y-4">
          <h2 className="text-2xl font-semibold text-amber-400">
            Privacy Policy
          </h2>
          <p className="text-gray-300">
            ReflectYr takes your privacy seriously. Here’s a quick overview:
          </p>
          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            <li>
              We collect minimal data like your email address for authentication
              and saving lists.
            </li>
            <li>
              Your data is stored securely and used only to enhance your
              experience.
            </li>
            <li>We never share or sell your information to third parties.</li>
          </ul>
          <p className="text-gray-300">
            For more details, read our full{" "}
            <a
              href="/about"
              className="underline text-amber-400 hover:text-amber-500"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        {/* Back to Top */}
        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="px-6 py-2 text-sm font-semibold text-gray-900 transition rounded shadow-md bg-amber-400 hover:bg-amber-500"
          >
            Back to Top
          </a>
        </div>
      </div>
    </div>
  );
}
