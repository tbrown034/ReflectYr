"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/app/UI/components/SearchBar";
import PaginationControls from "@/app/UI/components/PaginationControls";
import UserList from "./UserListFolder/UserList";
import FullList from "./MoviesList/FullList";
import SearchList from "./MoviesList/SearchList";

export default function ListWrapper({ movies, query, currentPage }) {
  const [userList, setUserList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false); // For mobile drawer

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
    const updatedList = userList.filter((movie) => movie.id !== movieId);
    setUserList(updatedList);
    localStorage.setItem("userList", JSON.stringify(updatedList));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updatedList = [...userList];
    [updatedList[index - 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index - 1],
    ];
    setUserList(updatedList);
    localStorage.setItem("userList", JSON.stringify(updatedList));
  };

  const moveDown = (index) => {
    if (index === userList.length - 1) return;
    const updatedList = [...userList];
    [updatedList[index + 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index + 1],
    ];
    setUserList(updatedList);
    localStorage.setItem("userList", JSON.stringify(updatedList));
  };

  return (
    <div className="flex flex-col-reverse gap-4 p-4 md:flex-row">
      {/* Search and Movie List */}
      <div className="flex-1">
        <h1 className="text-lg font-bold text-amber-400">Movies</h1>
        <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-lg">Add Movies</h1>
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
      <div className="hidden w-full max-w-sm p-4 bg-gray-800 rounded-lg shadow-lg md:block md:flex-shrink-0">
        <UserList
          userList={userList}
          removeMovie={removeMovie}
          moveUp={moveUp}
          moveDown={moveDown}
          setUserList={setUserList}
        />
      </div>

      {/* Mobile Drawer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 md:hidden">
        <button
          className="w-full px-4 py-8 text-sm font-bold text-gray-100 rounded-t-lg bg-amber-500 hover:bg-amber-600"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          {drawerOpen ? "Hide Your List" : "View Your List"}
        </button>
        {drawerOpen && (
          <div className="p-4 overflow-y-auto bg-gray-800 max-h-96">
            {" "}
            {/* Increased max height */}
            <UserList
              userList={userList}
              removeMovie={removeMovie}
              moveUp={moveUp}
              moveDown={moveDown}
              setUserList={setUserList}
            />
          </div>
        )}
      </div>
    </div>
  );
}
