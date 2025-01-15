import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function PATCH(req) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { listId, isPublic } = await req.json();

    if (!listId || typeof isPublic !== "boolean") {
      return new Response("Invalid data", { status: 400 });
    }

    await db.sql`
      UPDATE lists
      SET is_public = ${isPublic}
      WHERE list_id = ${listId} AND user_id = ${session.user.id};
    `;

    return new Response("List updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating list:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
