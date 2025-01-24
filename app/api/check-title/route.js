import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { title } = await req.json();
    const userId = session.user.id;

    // Query for existing titles with the same base pattern
    const { rows } = await db.sql`
      SELECT COALESCE(
        MAX(
          CAST(SUBSTRING(title FROM '\$begin:math:text$(\\\\d+)\\$end:math:text$$') AS INTEGER)
        ), 0) AS highest_suffix
      FROM lists
      WHERE user_id = ${userId} AND title LIKE ${title + "%"};
    `;

    const highestSuffix = rows[0]?.highest_suffix || 0;

    // If no existing titles match, the title is unique
    const isUnique = highestSuffix === 0;

    return new Response(
      JSON.stringify({
        isUnique,
        nextSuffix: isUnique ? null : highestSuffix + 1,
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
