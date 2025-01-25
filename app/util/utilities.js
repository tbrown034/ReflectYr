// app/util/utilities.js
export const saveToDB = async ({ listTitle, movies, allowSave, router }) => {
  if (!allowSave) {
    alert("Saving is not allowed.");
    return;
  }

  try {
    const response = await fetch("/api/save-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: listTitle,
        movies,
      }),
    });

    if (response.status === 409) {
      // Title taken => show that lovely message
      const msg = await response.text(); // Should be "Pick another name fucker!"
      alert(msg);
      return;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      alert(`Failed to save the list: ${errorMessage}`);
      return;
    }

    // Success => parse JSON
    const { listId } = await response.json();
    alert(
      `List saved successfully! List ID: ${listId} and name ID: ${listTitle}`
    );
    router.push("/profile");
  } catch (error) {
    console.error("Error saving list:", error);
    alert("An error occurred while saving. Please try again.");
  }
};
