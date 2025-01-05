import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless"; // Neon Serverless Pool

const isDevelopment = process.env.NODE_ENV === "development";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const pool = new Pool({
    connectionString: isDevelopment
      ? process.env.dev_URL // Development Neon database URL
      : process.env.POSTGRES_URL, // Production Neon database URL
  });

  return {
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
    adapter: PostgresAdapter(pool),
    session: {
      strategy: "database", // Store sessions in the database
    },
    secret: process.env.AUTH_SECRET,
  };
});
