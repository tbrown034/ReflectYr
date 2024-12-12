"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/app/UI/components/SearchBar";
import PaginationControls from "@/app/UI/components/PaginationControls";
import UserList from "./UserList/UserList";
import FullList from "./MoviesList/FullList";
import SearchList from "./MoviesList/SearchList";

export default function ListWrapper({ movies, query, currentPage }) {
  const [userList, setUserList] = useState([]);

  // Load user list from localStorage on initial render
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("userList") || "[]");
    setUserList(storedList);
  }, []);

  // Add a movie to the user's list
  const addToUserList = (movie) => {
    const updatedList = [...userList, movie];
    setUserList(updatedList);
    localStorage.setItem("userList", JSON.stringify(updatedList));
  };

  // Remove a movie from the user's list
  const removeMovie = (movieId) => {
    const updatedList = userList.filter((movie) => movie.id !== movieId);
    setUserList(updatedList);
    localStorage.setItem("userList", JSON.stringify(updatedList));
  };

  // Move a movie up in the user's list
  const moveUp = (index) => {
    if (index === 0) return; // Already at the top
    const updatedList = [...userList];
    [updatedList[index - 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index - 1],
    ];
    setUserList(updatedList);
    localStorage.setItem("userList", JSON.stringify(updatedList));
  };

  // Move a movie down in the user's list
  const moveDown = (index) => {
    if (index === userList.length - 1) return; // Already at the bottom
    const updatedList = [...userList];
    [updatedList[index + 1], updatedList[index]] = [
      updatedList[index],
      updatedList[index + 1],
    ];
    setUserList(updatedList);
    localStorage.setItem("userList", JSON.stringify(updatedList));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Movies Section */}
      <div className="flex flex-col gap-4 p-4 border-2 border-black rounded-xl">
        <h1 className="text-2xl font-bold">Top Movies</h1>
        <SearchBar query={query} />
        {query ? (
          <SearchList
            movies={movies}
            userList={userList}
            addToUserList={addToUserList}
            removeMovie={removeMovie}
          />
        ) : (
          <FullList
            movies={movies}
            userList={userList}
            addToUserList={addToUserList}
            removeMovie={removeMovie}
          />
        )}
        <PaginationControls currentPage={currentPage} query={query} />
      </div>

      {/* User's Selected Movies Section */}
      <div className="flex flex-col gap-4 p-4 border-2 border-black rounded-xl">
        <UserList
          userList={userList}
          removeMovie={removeMovie}
          moveUp={moveUp}
          moveDown={moveDown}
        />
      </div>
    </div>
  );
}
