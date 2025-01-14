/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org", // TMDB's image domain
        port: "",
        pathname: "/t/p/**", // Path pattern for TMDB images
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // Picsum's image domain
        port: "",
        pathname: "/**", // Allows all paths under picsum.photos
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google user profile pictures
        port: "",
        pathname: "/**", // Allows all paths under this domain
      },
    ],
  },
};

export default nextConfig;
