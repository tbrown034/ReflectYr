"use client";

import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import FullAndSearchLists from "./FullAndSearchLists/FullAndSearchLists";
import UserList from "@/app/movies/UserList/UserList";
import {
  addToUserList,
  removeMovie,
  moveUp,
  moveDown,
} from "@/app/helpers/listcontrols";

export default function ListWrapper({ movies, currentPage }) {
  const [userList, setUserList] = useState([]);
  const [tabState, setTabState] = useState("available");

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("userList") || "[]");
    setUserList(storedList);
  }, []);

  return (
    <div className="flex flex-col gap-8 px-4 py-6 md:px-8 md:py-12 md:flex-row">
      {/* MOBILE & TABLET: TABS */}
      <div className="w-full md:hidden">
        <TabGroup
          onChange={(index) => setTabState(index === 0 ? "available" : "user")}
        >
          {/* Rounded top corners on TabList */}
          <TabList className="flex overflow-hidden bg-gray-100 border-b border-gray-300 rounded-t-xl dark:border-gray-700 dark:bg-gray-800">
            <Tab
              className={({ selected }) =>
                `
                flex-1 py-3 text-center font-semibold cursor-pointer
                transition-all duration-300
                ${
                  selected
                    ? // Selected tab: subtle gray highlight, small shadow
                      "relative text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 border-b-2 border-gray-500 rounded-t-xl shadow-md"
                    : // Unselected tab: hover style
                      "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }
              `
              }
            >
              Available Items
            </Tab>
            <Tab
              className={({ selected }) =>
                `
                flex-1 py-3 text-center font-semibold cursor-pointer
                transition-all duration-300
                ${
                  selected
                    ? "relative text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 border-b-2 border-gray-500 rounded-t-xl shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }
              `
              }
            >
              Your Items
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel className="py-2">
              <FullAndSearchLists
                movies={movies}
                userList={userList}
                currentPage={currentPage}
                addToUserList={(movie) =>
                  addToUserList(userList, setUserList, movie)
                }
              />
            </TabPanel>
            <TabPanel className="py-4">
              <UserList
                userList={userList}
                removeMovie={(movieId) =>
                  removeMovie(userList, setUserList, movieId)
                }
                moveUp={(index) => moveUp(index, userList, setUserList)}
                moveDown={(index) => moveDown(index, userList, setUserList)}
                setUserList={setUserList}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>

      {/* DESKTOP & LARGE: SIDE-BY-SIDE */}
      <div className="hidden w-full gap-6 md:flex">
        <div className="w-1/2">
          <FullAndSearchLists
            movies={movies}
            userList={userList}
            currentPage={currentPage}
            addToUserList={(movie) =>
              addToUserList(userList, setUserList, movie)
            }
          />
        </div>

        <div className="w-1/2">
          <UserList
            userList={userList}
            removeMovie={(movieId) =>
              removeMovie(userList, setUserList, movieId)
            }
            moveUp={(index) => moveUp(index, userList, setUserList)}
            moveDown={(index) => moveDown(index, userList, setUserList)}
            setUserList={setUserList}
          />
        </div>
      </div>
    </div>
  );
}
