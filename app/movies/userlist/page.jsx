// Location: app/movies/userlist/page.jsx
import UserListClient from "./UserListClient";

export default async function UserListPage({ searchParams }) {
  const { data } = searchParams || {};

  if (!data) {
    return <div>No user list data provided.</div>;
  }

  let userList = [];
  try {
    userList = JSON.parse(decodeURIComponent(data));
  } catch (error) {
    console.error("Failed to parse user list data:", error);
    return <div>Invalid user list data.</div>;
  }

  return <UserListClient initialUserList={userList} />;
}
