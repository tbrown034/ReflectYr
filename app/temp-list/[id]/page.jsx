import { auth } from "@/auth";
import LoggedInList from "./LoggedInList";
import LoggedOutList from "./LoggedOutList";

export default async function TemporaryList({ params: paramsPromise }) {
  const params = await paramsPromise;

  // Extract the temporaryListId from params
  const { id: temporaryListId } = params;
  if (!temporaryListId) {
    console.error("No temporaryListId found in params.");
    return <p>Error: No temporary list ID provided.</p>;
  }

  const session = await auth();
  if (session?.user) {
    return (
      <div>
        <LoggedInList
          temporaryListId={temporaryListId} // Pass the temporary list ID
          userName={session.user.name} // Pass the user's name for display
          session={session} // Pass session object
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
