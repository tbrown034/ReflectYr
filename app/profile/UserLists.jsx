"use client";

import { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";

const UserLists = ({ initialLists }) => {
  const [lists, setLists] = useState(initialLists);

  const deleteList = (listId) => {
    // Filter out the deleted list
    setLists((prevLists) =>
      prevLists.filter((list) => list.list_id !== listId)
    );
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {lists.map((list) => (
        <div
          key={list.list_id}
          className="relative flex flex-col p-4 bg-gray-600 rounded-lg shadow-md"
        >
          {/* Delete Button */}
          <DeleteButton listId={list.list_id} deleteList={deleteList} />

          {/* List Title and Creation Date */}
          <div>
            <h3 className="text-lg font-bold text-gray-100">{list.title}</h3>
            <p className="mt-1 text-sm text-gray-300">
              Created: {new Date(list.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* List Items */}
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

          {/* Note if there are more items */}
          {list.items.length === 10 && (
            <p className="mt-2 text-sm italic text-gray-400">
              + More items not shown...
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserLists;
