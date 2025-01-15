"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";

const PublicToggle = ({ listId, isPublic, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/update-list`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listId, isPublic: !isPublic }),
      });

      if (response.ok) {
        onToggle(listId, !isPublic); // Update the parent state
      } else {
        console.error("Failed to update list privacy.");
      }
    } catch (error) {
      console.error("Error updating list privacy:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <Switch
        checked={isPublic}
        onChange={handleToggle}
        disabled={loading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          isPublic ? "bg-green-500" : "bg-gray-500"
        } ${loading ? "cursor-not-allowed opacity-50" : "hover:bg-opacity-80"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            isPublic ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </Switch>
      <span className="ml-3 text-sm font-medium text-gray-200">
        {isPublic ? "Public" : "Private"}
      </span>
    </div>
  );
};

export default PublicToggle;
