// app/api/save-list/route.js
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    // Authenticate the user
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Parse the request body
    const { title, movies } = await req.json();

    // Validate the incoming data
    if (!title || !Array.isArray(movies) || movies.length === 0) {
      return new Response("Invalid data: 'title' and 'movies' are required.", {
        status: 400,
      });
    }

    const userId = session.user.id;

    // Check for title uniqueness
    const { rows: existingTitles } = await db.sql`
      SELECT 1
      FROM lists
      WHERE user_id = ${userId} AND title = ${title}
      LIMIT 1;
    `;

    if (existingTitles.length > 0) {
      return new Response(
        "The title already exists. Please choose a different name.",
        { status: 409 }
      );
    }

    // Insert the list into the `lists` table
    const result = await db.sql`
      INSERT INTO lists (user_id, title, is_public, created_at)
      VALUES (${userId}, ${title}, false, NOW())
      RETURNING list_id, created_at;
    `;

    const list = result.rows[0];

    // Insert the movies into the `list_items` table
    const movieInsertPromises = movies.map((movie, index) => {
      if (!movie.id) {
        // If a movie is missing the 'id', throw a specific error
        throw new Error(
          `Movie at index ${index} is missing the 'id' property.`
        );
      }

      return db.sql`
        INSERT INTO list_items (list_id, tmdb_id, position, created_at)
        VALUES (${list.list_id}, ${movie.id}, ${index + 1}, NOW());
      `;
    });

    await Promise.all(movieInsertPromises);

    // Return success response with listId and creation date
    return new Response(
      JSON.stringify({
        success: true,
        listId: list.list_id,
        createdAt: list.created_at,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Handle specific PostgreSQL errors
    if (error.code === "23502") {
      return new Response("Missing required fields.", { status: 400 });
    }

    // Handle validation errors for movies
    if (error.message && error.message.startsWith("Movie at index")) {
      return new Response(error.message, { status: 400 });
    }

    // For other unforeseen errors, return a generic message
    return new Response("Internal Server Error", { status: 500 });
  }
}
