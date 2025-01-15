"use client";

import { useState } from "react";
import DeleteButton from "./DeleteButton";
import PublicToggle from "./PublicToggle";
import ViewButton from "./ViewButton";

const UserLists = ({ initialLists }) => {
  const [lists, setLists] = useState(initialLists);

  const deleteList = (listId) => {
    setLists((prev) => prev.filter((list) => list.list_id !== listId));
  };

  const togglePrivacy = (listId, isPublic) => {
    setLists((prev) =>
      prev.map((list) =>
        list.list_id === listId ? { ...list, is_public: isPublic } : list
      )
    );
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {lists.map((list) => (
        <div
          key={list.list_id}
          className="relative flex flex-col p-4 bg-gray-600 rounded-lg shadow-md"
        >
          <DeleteButton listId={list.list_id} deleteList={deleteList} />
          <div>
            <h3 className="text-lg font-bold text-gray-100">{list.title}</h3>
            <p className="mt-1 text-sm text-gray-300">
              Created: {new Date(list.created_at).toLocaleDateString()}
            </p>
          </div>
          <ul className="mt-4 space-y-1">
            {list.items.map((item, index) => (
              <li
                key={item.tmdb_id}
                className="text-sm font-semibold text-gray-200"
              >
                {index + 1}. {item.title}
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <PublicToggle
              listId={list.list_id}
              isPublic={list.is_public}
              onToggle={togglePrivacy}
            />
            <ViewButton listId={list.list_id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLists;
