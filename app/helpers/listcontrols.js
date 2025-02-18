// listControls.js - fixed title

// Add a movie to the user list
export const addToUserList = (userList, setUserList, movie) => {
  const updatedList = [...userList, movie];
  setUserList(updatedList);
  localStorage.setItem("userList", JSON.stringify(updatedList));
};

// Remove a movie from the user list
export const removeMovie = (userList, setUserList, movieId) => {
  const updatedList = userList.filter((m) => m.id !== movieId);
  setUserList(updatedList);
  localStorage.setItem("userList", JSON.stringify(updatedList));
};

// Move a movie up in the list
export const moveUp = (index, userList, setUserList) => {
  if (index === 0) return; // Can't move the first item up
  const updatedList = [...userList];
  [updatedList[index - 1], updatedList[index]] = [
    updatedList[index],
    updatedList[index - 1],
  ];
  setUserList(updatedList);
  localStorage.setItem("userList", JSON.stringify(updatedList));
};

// Move a movie down in the list
export const moveDown = (index, userList, setUserList) => {
  if (index === userList.length - 1) return; // Can't move the last item down
  const updatedList = [...userList];
  [updatedList[index], updatedList[index + 1]] = [
    updatedList[index + 1],
    updatedList[index],
  ];
  setUserList(updatedList);
  localStorage.setItem("userList", JSON.stringify(updatedList));
};

// listcontrols.js

// Finalize the user list (save and redirect)
export const handleFinalize = (userList, router) => {
  if (userList.length === 0) {
    alert("No movies in your list to finalize!");
    return;
  }

  // Generate a unique temporary list ID
  const temporaryListId = Math.random().toString(36).substring(2, 10);

  // Save the list in localStorage using the temporaryListId
  localStorage.setItem(
    `temporaryList-${temporaryListId}`,
    JSON.stringify(userList)
  );

  // Redirect to the dynamic temp-list route with the temporaryListId
  router.push(`/temp-list/${temporaryListId}`);
};

// Clear the user list
export const handleClear = (setUserList) => {
  // Clear the list in local state
  setUserList([]);

  // Clear all temporary list data from localStorage
  localStorage.setItem("userList", "[]");
};
