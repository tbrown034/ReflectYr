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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {lists.map((list) => (
        <div
          key={list.list_id}
          className="flex flex-col bg-gray-800 rounded-lg shadow-md"
        >
          {/* Cover Image */}
          {list.items[0]?.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${list.items[0].poster_path}`}
              alt={list.items[0].title}
              className="object-cover w-full h-32 rounded-t-lg"
            />
          ) : (
            <div className="w-full h-32 bg-gray-700 rounded-t-lg" />
          )}

          {/* List Info */}
          <div className="flex flex-col flex-1 p-4">
            <h3 className="text-lg font-bold text-gray-100">{list.title}</h3>
            <p className="mt-1 text-sm text-gray-400">
              Created: {new Date(list.created_at).toLocaleDateString()}
            </p>
            <ul className="mt-2 space-y-1">
              {list.items.slice(0, 10).map((item, index) => (
                <li key={item.tmdb_id} className="text-sm text-gray-300">
                  {index + 1}. {item.title}
                </li>
              ))}
              {list.items.length > 10 && (
                <li className="text-sm italic text-gray-400">More...</li>
              )}
            </ul>

            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <ViewButton listId={list.list_id} />
              <DeleteButton listId={list.list_id} deleteList={deleteList} />
              <PublicToggle
                listId={list.list_id}
                isPublic={list.is_public}
                onToggle={togglePrivacy}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLists;
