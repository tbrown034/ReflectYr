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

    // Check if the title exists for the user
    const { rows: existingTitles } = await db.sql`
      SELECT 1
      FROM lists
      WHERE user_id = ${userId} AND title = ${title}
      LIMIT 1;
    `;

    const isUnique = existingTitles.length === 0;

    return new Response(JSON.stringify({ isUnique }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error checking title:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
