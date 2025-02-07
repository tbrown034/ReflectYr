import localFont from "next/font/local";
import Header from "./UI/Header/Header";
import Footer from "./UI/Footer";
import "./globals.css";
import { YearProvider } from "./context/YearContext";

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
  description: "ReflectYr is your personalized year-in-review platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      {/* Dark mode is default */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} p-2 flex flex-col min-h-screen justify-between bg-gray-300 text-gray-900 dark:bg-gray-900 dark:text-gray-200`}
      >
        <YearProvider>
          <Header />
          {children}
          <Footer />
        </YearProvider>
      </body>
    </html>
  );
}
