import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    console.log("Processing save-list request...");

    // Authenticate the user
    const session = await auth();
    if (!session?.user) {
      console.warn("Unauthorized access attempt.");
      return new Response("Unauthorized", { status: 401 });
    }
    console.log("User authenticated:", session.user);

    // Test database connection
    console.log("Testing database connection...");
    const { rows: testRows } = await db.sql`SELECT 1 AS test_column`;
    console.log("Database connection successful. Test result:", testRows);

    // Parse the request body
    const { title, movies } = await req.json();
    console.log("Received payload:", { title, movies });

    // Validate the incoming data
    if (!title || !movies?.length) {
      console.error("Validation error: Missing title or movies.");
      return new Response("Invalid data", { status: 400 });
    }

    const userId = session.user.id;

    // Insert the list into the `lists` table
    const result = await db.sql`
      INSERT INTO lists (user_id, title, is_public, created_at)
      VALUES (${userId}, ${title}, false, NOW())
      RETURNING list_id;
    `;

    const list = result.rows[0]; // Extract the first row
    console.log("List created with ID:", list.list_id);

    // Insert the movies into the `list_items` table
    const movieInsertQueries = movies.map(
      (movie, index) =>
        db.sql`
        INSERT INTO list_items (list_id, tmdb_id, position, created_at)
        VALUES (${list.list_id}, ${movie.tmdb_id}, ${index + 1}, NOW());
      `
    );

    await Promise.all(movieInsertQueries);
    console.log("Movies inserted into list_items table.");

    // Return success response
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error("Error saving list:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
