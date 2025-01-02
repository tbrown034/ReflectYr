import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const isDevelopment = process.env.NODE_ENV === "development";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: isDevelopment
        ? process.env.AUTH_GITHUB_ID_DEV
        : process.env.AUTH_GITHUB_ID,
      clientSecret: isDevelopment
        ? process.env.AUTH_GITHUB_SECRET_DEV
        : process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET, // Make sure your auth secret is set
});
