import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ReflectYr",
  description:
    "ReflectYr is your personalized year-in-review platform. It’s designed to help you look back on the movies, TV shows, music, books, and other cultural highlights that made your year memorable—and share them with the world.",
  icons: {
    icon: "/favicon.ico", // Default favicon for most browsers
    apple: "/apple-touch-icon.png", // Apple devices
    other: [
      { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
      { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
    ],
  },
  manifest: "/site.webmanifest", // For Progressive Web App support
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-2`}
      >
        {children}
      </body>
    </html>
  );
}
