import BaseList from "./components/BaseList";

export default function LoggedOutList({ temporaryListId }) {
  return (
    <BaseList
      temporaryListId={temporaryListId}
      initialTitle="My Top Movies of 2024"
      allowSave={false} // No Save List functionality for logged-out users
    />
  );
}
