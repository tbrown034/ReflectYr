import BaseList from "./components/BaseList";

export default function LoggedInList({ temporaryListId, userName, session }) {
  return (
    <BaseList
      temporaryListId={temporaryListId}
      initialTitle={`${userName}'s Top Movies of 2024`}
      allowSave={true} // Enable Save List functionality
      session={session} // Pass session object
    />
  );
}
