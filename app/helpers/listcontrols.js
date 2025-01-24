// listcontrols.js

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

// Save the user's list to the database
export const saveToDB = async ({
  listTitle,
  movies,
  allowSave,
  setSuggestedTitle,
  router,
}) => {
  if (!allowSave) {
    alert("Saving is not allowed.");
    return;
  }

  try {
    // Step 1: Check if the title is unique
    const titleCheckResponse = await fetch("/api/check-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: listTitle }),
    });

    const { isUnique, nextSuffix } = await titleCheckResponse.json();

    if (!titleCheckResponse.ok) {
      alert("Error checking title uniqueness. Please try again.");
      return;
    }

    // Step 2: Handle title conflicts
    if (!isUnique) {
      const suggested = `${listTitle} (${nextSuffix})`;
      setSuggestedTitle(suggested);

      const confirmed = confirm(
        `The title "${listTitle}" already exists. Save as "${suggested}"?`
      );

      if (!confirmed) return; // User cancels
    } else {
      setSuggestedTitle(null);
      const confirmed = confirm(`Do you want to save "${listTitle}"?`);
      if (!confirmed) return; // User cancels
    }

    // Step 3: Prepare the payload
    const finalTitle = isUnique ? listTitle : `${listTitle} (${nextSuffix})`;
    const payload = {
      title: finalTitle,
      movies: movies.map((movie, index) => ({
        tmdb_id: movie.id,
        position: index + 1,
      })),
    };

    // Step 4: Save the list to the database
    const saveResponse = await fetch("/api/save-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (saveResponse.ok) {
      const { listId } = await saveResponse.json();
      alert(`List saved successfully! List ID: ${listId}`);
      router.push("/profile"); // Redirect to profile after saving
    } else {
      const errorMessage = await saveResponse.text();
      alert(`Failed to save the list. Error: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error saving list:", error);
    alert("An error occurred while saving. Please try again.");
  }
};
