"use client";

import { useState } from "react";
import UserListControls from "../UserList/UserlistControls";

export default function UserListClient({ initialUserList }) {
  const [userList, setUserList] = useState(initialUserList);

  const moveUp = (index) => {
    if (index === 0) return;
    const updatedList = [...userList];
    [updatedList[index - 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index - 1],
    ];
    setUserList(updatedList);
  };

  const moveDown = (index) => {
    if (index === userList.length - 1) return;
    const updatedList = [...userList];
    [updatedList[index + 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index + 1],
    ];
    setUserList(updatedList);
  };

  const removeMovie = (index) => {
    const updatedList = userList.filter((_, i) => i !== index);
    setUserList(updatedList);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Your Final Movie List</h1>

      {userList.length === 0 ? (
        <p>No movies in your list!</p>
      ) : (
        <ol className="list-decimal list-inside">
          {userList.map((movie, index) => (
            <li
              key={movie.id || index}
              className="flex items-center py-2 border-b"
            >
              <span className="flex-1">{movie.title}</span>
              <div className="flex gap-2">
                <UserListControls
                  onMoveUp={index > 0 ? () => moveUp(index) : null}
                  onMoveDown={
                    index < userList.length - 1 ? () => moveDown(index) : null
                  }
                  onRemove={() => removeMovie(index)}
                />
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
