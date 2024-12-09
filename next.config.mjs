const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Protocol of the external image
        hostname: "picsum.photos", // Domain of the external image
        port: "", // Optional, if your images are served on a specific port
        pathname: "/**", // Allows all paths under picsum.photos
      },
    ],
  },
};

export default nextConfig;
