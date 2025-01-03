"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/app/UI/components/SearchBar";
import PaginationControls from "@/app/UI/components/PaginationControls";
import UserList from "./UserListFolder/UserList";
import FullList from "./MoviesList/FullList";
import SearchList from "./MoviesList/SearchList";

export default function ListWrapper({ movies, query, currentPage }) {
  const [userList, setUserList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("userList") || "[]");
    setUserList(storedList);
  }, []);

  const addToUserList = (movie) => {
    const updatedList = [...userList, movie];
    setUserList(updatedList);
    localStorage.setItem("userList", JSON.stringify(updatedList));
  };

  const removeMovie = (movieId) => {
    const updatedList = userList.filter((m) => m.id !== movieId);
    setUserList(updatedList);
    localStorage.setItem("userList", JSON.stringify(updatedList));
  };

  return (
    <div className="flex flex-col-reverse gap-6 md:flex-row">
      {/* Search Results */}
      <div className="flex-1">
        <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Add Movies
          </h2>
          <SearchBar query={query} />
          {query ? (
            <SearchList
              movies={movies}
              userList={userList}
              addToUserList={addToUserList}
            />
          ) : (
            <FullList
              movies={movies}
              userList={userList}
              addToUserList={addToUserList}
            />
          )}
          <PaginationControls currentPage={currentPage} query={query} />
        </div>
      </div>

      {/* User List */}
      <div className="hidden w-full max-w-sm p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800 md:block">
        <UserList
          userList={userList}
          removeMovie={removeMovie}
          setUserList={setUserList}
        />
      </div>
    </div>
  );
}
