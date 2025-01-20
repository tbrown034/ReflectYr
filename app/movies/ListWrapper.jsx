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

  // Load user list from local storage
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
    <div className="flex justify-between gap-6 md:flex-row">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Movies Section */}
        <div className="flex flex-col gap-4 p-6 bg-gray-200 rounded-lg shadow-md dark:bg-gray-800 md:basis-2/3">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
            <span className="text-amber-500 dark:text-amber-400">
              Add Movies to Your List
            </span>
          </h1>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Explore the most popular movies of the year, or search for your
            favorites to start building your personalized list.
          </p>
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

        {/* User List Section */}
        <div className="hidden p-6 bg-gray-200 rounded-lg shadow-md dark:bg-gray-800 md:block ">
          <UserList
            userList={userList}
            removeMovie={removeMovie}
            setUserList={setUserList}
          />
        </div>
      </div>

      {/* Mobile Drawer Section */}
      <div className="fixed inset-x-0 bottom-0 md:hidden">
        {/* Toggle Button */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="w-full px-6 py-4 text-lg font-bold text-center text-gray-100 shadow-lg bg-amber-500 rounded-t-xl hover:bg-amber-600"
        >
          {drawerOpen
            ? "Hide Your List 🙈"
            : `View Your List 📋 (${userList.length}/10)`}
        </button>

        {/* Drawer Content */}
        <div
          className={`transition-transform duration-300 ease-in-out bg-gray-900 rounded-t-xl shadow-xl dark:bg-gray-800 ${
            drawerOpen ? "max-h-[75vh]" : "max-h-0"
          } overflow-hidden`}
        >
          {drawerOpen && (
            <div className="p-4 overflow-y-auto max-h-[65vh]">
              <h2 className="mb-4 text-xl font-bold text-center text-gray-100">
                Your Temporary List
              </h2>
              <UserList
                userList={userList}
                removeMovie={removeMovie}
                setUserList={setUserList}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
