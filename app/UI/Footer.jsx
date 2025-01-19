import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-6 py-10 text-gray-300 bg-gray-800 rounded-lg">
      {/* Footer Content */}
      <div className="container grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        {/* About Section */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-amber-400">
            About ReflectYr
          </h2>
          <p className="text-sm leading-relaxed">
            ReflectYr is your personalized hub for curating and sharing your
            favorite movies, TV shows, and more from the past year. Celebrate
            your year in entertainment with style!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-amber-400">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/movies" className="transition hover:text-amber-400">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/tv" className="transition hover:text-amber-400">
                TV Shows
              </Link>
            </li>
            <li>
              <Link href="/profile" className="transition hover:text-amber-400">
                My Profile
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-amber-400">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-amber-400">Follow Us</h2>
          <p className="mb-4 text-sm">
            Stay connected with us on social media:
          </p>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-amber-400"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-amber-400"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-amber-400"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-amber-400"
              aria-label="YouTube"
            >
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-amber-400">Newsletter</h2>
          <p className="mb-4 text-sm">
            Subscribe to stay updated on the latest trends and features:
          </p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 text-sm text-gray-200 placeholder-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white transition rounded bg-amber-500 hover:bg-amber-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-6 mt-8 text-center border-t border-gray-700">
        <p className="text-sm">
          © 2024 ReflectYr. All rights reserved. Built with ❤️ by{" "}
          <a href="#" className="hover:text-amber-400">
            Trevor Brown
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
