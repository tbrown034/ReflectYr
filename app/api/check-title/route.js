import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    // Authenticate the user
    const session = await auth();
    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { title } = await req.json();
    const userId = session.user.id;

    // Query for existing titles matching the base pattern
    const rows = await db.sql`
      SELECT title
      FROM lists
      WHERE user_id = ${userId} AND title LIKE ${title + "%"};
    `;

    // Determine the highest numeric suffix
    let maxSuffix = 0;
    const regex = /\((\d+)\)$/;

    rows.forEach((row) => {
      const match = row.title.match(regex);
      if (match) {
        maxSuffix = Math.max(maxSuffix, parseInt(match[1], 10));
      }
    });

    // Generate a unique title
    const nextSuffix = maxSuffix + 1;
    const uniqueTitle = maxSuffix === 0 ? title : `${title} (${nextSuffix})`;

    // Return the unique title
    return new Response(
      JSON.stringify({
        isUnique: maxSuffix === 0,
        uniqueTitle,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error checking title uniqueness:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
