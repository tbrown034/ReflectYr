import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Title({ listTitle, isEditing, onTitleChange, onSave }) {
  const [isTitleValid, setIsTitleValid] = useState(true); // Validation state
  const [validationMessage, setValidationMessage] = useState(""); // Error message
  const [suggestedTitle, setSuggestedTitle] = useState(""); // Suggested unique title

  // Debounced function to check title uniqueness
  const checkTitleUniqueness = useDebouncedCallback(async (title) => {
    try {
      const response = await fetch("/api/check-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const { isUnique } = await response.json();

      if (!isUnique) {
        setIsTitleValid(false);
        setValidationMessage(
          "This title already exists. Please choose a different one."
        );
        setSuggestedTitle(`${title} (2)`); // Suggest a unique title
      } else {
        setIsTitleValid(true);
        setValidationMessage("");
        setSuggestedTitle(""); // Clear suggestion
      }
    } catch (error) {
      console.error("Error checking title uniqueness:", error);
      setIsTitleValid(false);
      setValidationMessage("Something went wrong. Please try again.");
    }
  }, 500); // 500ms debounce

  const handleTitleChange = (e) => {
    const title = e.target.value;
    onTitleChange(e); // Update the parent component's state
    checkTitleUniqueness(title); // Trigger debounced validation
  };

  const handleSave = () => {
    if (!isTitleValid) {
      alert(
        "The title you entered already exists. Please choose a unique title."
      );
      return;
    }
    onSave(); // Call the save function from the parent
  };

  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={listTitle}
          onChange={handleTitleChange}
          className={`w-full p-2 text-sm font-bold text-center text-black border-2 rounded-lg shadow-sm focus:outline-none ${
            isTitleValid ? "focus:border-amber-500" : "border-red-500"
          }`}
        />
        {!isTitleValid && (
          <p className="mt-1 text-sm text-red-500">
            {validationMessage}
            {suggestedTitle && (
              <>
                <br />
                Suggested: <span className="font-bold">{suggestedTitle}</span>
              </>
            )}
          </p>
        )}
        <button
          onClick={handleSave}
          disabled={!isTitleValid} // Disable save if title is invalid
          className={`w-full px-4 py-2 mt-2 text-sm font-semibold transition rounded-lg ${
            isTitleValid
              ? "text-gray-900 bg-amber-400 hover:bg-amber-500"
              : "text-gray-400 bg-gray-200 cursor-not-allowed"
          }`}
        >
          Save Title
        </button>
      </div>
    );
  }

  return (
    <h1 className="text-2xl font-extrabold text-center md:text-4xl text-amber-600 dark:text-amber-400 drop-shadow-md">
      {listTitle}
    </h1>
  );
}
