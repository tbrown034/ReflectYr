import { auth } from "@/auth";
import BaseList from "./BaseList";

export default async function TemporaryList({ params: paramsPromise }) {
  // Await your params exactly as you are doing now
  const params = await paramsPromise;

  // Extract the temporaryListId from params
  const { id: temporaryListId } = params;
  if (!temporaryListId) {
    console.error("No temporaryListId found in params.");
    return <p>Error: No temporary list ID provided.</p>;
  }

  // Check the user session
  const session = await auth();
  const isLoggedIn = !!session?.user;

  // Decide on an initial list title
  const initialTitle = isLoggedIn
    ? `${session.user.name}'s Top Movies of 2024`
    : "My Top Movies of 2024";

  return (
    <BaseList
      // ID needed to store/load local list from localStorage
      temporaryListId={temporaryListId}
      // This title changes depending on login status
      initialTitle={initialTitle}
      // Only allow saving if user is logged in
      allowSave={isLoggedIn}
      // Pass session if you need it in the Client Component
      session={session}
    />
  );
}
