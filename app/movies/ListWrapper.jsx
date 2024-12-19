"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/app/UI/components/SearchBar";
import PaginationControls from "@/app/UI/components/PaginationControls";
import UserList from "./UserListFolder/UserList";
import FullList from "./MoviesList/FullList";
import SearchList from "./MoviesList/SearchList";

export default function ListWrapper({ movies, query, currentPage }) {
  const [userList, setUserList] = useState([]);

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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-amber-400">Top Movies</h1>
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
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-amber-400">Your List</h1>
        <UserList
          userList={userList}
          removeMovie={removeMovie}
          moveUp={moveUp}
          moveDown={moveDown}
          setUserList={setUserList}
        />
      </div>
    </div>
  );
}
