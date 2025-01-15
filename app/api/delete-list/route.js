import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function DELETE(req) {
  try {
    console.log("Processing DELETE request...");

    // Authenticate the user
    const session = await auth();
    if (!session?.user) {
      console.warn("Unauthorized access attempt.");
      return new Response("Unauthorized", { status: 401 });
    }

    console.log("User authenticated:", session.user);

    // Parse the incoming JSON body
    const body = await req.json();
    console.log("Received body:", body);

    const { listId } = body;

    if (!listId) {
      console.error("Missing list ID in request");
      return new Response("Missing list ID", { status: 400 });
    }

    console.log(`Attempting to delete list with ID: ${listId}`);

    // Ensure the list belongs to the authenticated user
    const result = await db.sql`
      SELECT 1 FROM lists WHERE list_id = ${listId} AND user_id = ${session.user.id};
    `;

    console.log("List lookup result:", result.rows);

    if (result.rowCount === 0) {
      console.error("List not found or does not belong to the user");
      return new Response("List not found or access denied", { status: 404 });
    }

    // Delete list items first, then the list itself
    await db.sql`DELETE FROM list_items WHERE list_id = ${listId}`;
    console.log(`Deleted list items for list ID: ${listId}`);

    await db.sql`DELETE FROM lists WHERE list_id = ${listId}`;
    console.log(`Deleted list with ID: ${listId}`);

    return new Response("List deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting list:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
