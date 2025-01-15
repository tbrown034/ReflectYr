import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function DELETE(req) {
  try {
    // Authenticate the user
    const session = await auth();
    if (!session?.user) {
      console.warn("Unauthorized access attempt.");
      return new Response("Unauthorized", { status: 401 });
    }

    console.log("User authenticated:", session.user);

    // Parse the incoming JSON body to get the listId
    const { listId } = await req.json();

    if (!listId) {
      console.error("Missing list ID in request");
      return new Response("Missing list ID", { status: 400 });
    }

    console.log(`Attempting to delete list with ID: ${listId}`);

    // Ensure the list belongs to the authenticated user
    const { rowCount: listExists } = await db.sql`
      SELECT 1 FROM lists WHERE list_id = ${listId} AND user_id = ${session.user.id};
    `;

    if (!listExists) {
      console.error("List not found or does not belong to the user");
      return new Response("List not found or access denied", { status: 404 });
    }

    // Transactional deletion to ensure atomicity
    await db.sql.begin(async (transaction) => {
      // Delete associated list items first
      await transaction`DELETE FROM list_items WHERE list_id = ${listId};`;

      // Delete the list itself
      await transaction`DELETE FROM lists WHERE list_id = ${listId};`;
    });

    console.log(`List with ID ${listId} deleted successfully.`);
    return new Response("List deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting list:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
