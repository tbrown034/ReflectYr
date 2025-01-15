import { db } from "@/lib/db";

export async function DELETE(req) {
  try {
    const { listId } = await req.json();

    if (!listId) {
      return new Response("Missing list ID", { status: 400 });
    }

    // Delete list items first
    await db.sql`DELETE FROM list_items WHERE list_id = ${listId};`;

    // Delete the list
    await db.sql`DELETE FROM lists WHERE list_id = ${listId};`;

    return new Response("List deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting list:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
