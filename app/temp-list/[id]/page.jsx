import { auth } from "@/auth"; // Import your auth helper
import LoggedInList from "./LoggedInList";
import LoggedOutList from "./LoggedOutList";

export default async function TemporaryList({ params: paramsPromise }) {
  // Await the params object as per Next.js v15.1.3
  const params = await paramsPromise;

  // Extract the temporaryListId from params
  const { id: temporaryListId } = params;

  if (!temporaryListId) {
    console.error("No temporaryListId found in params.");
    return <p>Error: No temporary list ID provided.</p>;
  }

  // Check if the user is signed in
  const session = await auth();

  // Render LoggedInList or LoggedOutList based on authentication
  if (session?.user) {
    return (
      <div>
        <LoggedInList
          temporaryListId={temporaryListId} // Pass the temporary list ID
          userName={session.user.name} // Pass the user's name for display
        />
      </div>
    );
  } else {
    return (
      <div>
        <LoggedOutList temporaryListId={temporaryListId} />
      </div>
    );
  }
}
