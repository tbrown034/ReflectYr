import BaseList from "./components/BaseList";

export default function LoggedInList({ temporaryListId, userName, session }) {
  const mediaType = "Movies"; // Default mediaType (future-proof for TV or others)
  const year = 2024; // Default year

  return (
    <BaseList
      temporaryListId={temporaryListId}
      initialTitle={`${userName}'s Top ${mediaType} of ${year}`} // Dynamic title
      allowSave={true} // Enable Save List functionality
      session={session} // Pass session object
    />
  );
}
