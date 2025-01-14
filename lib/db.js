import { createPool } from "@vercel/postgres";

const isDevelopment = process.env.NODE_ENV === "development";

// Select the appropriate connection string
const connectionString = isDevelopment
  ? process.env.dev_URL // Development database
  : process.env.POSTGRES_URL; // Production database

if (!connectionString) {
  throw new Error("No database connection string provided.");
}

console.log("Using connection string:", connectionString);

// Initialize the database pool
export const db = createPool({ connectionString });
export const sql = db.sql;
