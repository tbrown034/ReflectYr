"use client";

import { useState } from "react";

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
        onToggle(listId, !isPublic); // Update local state
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
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-2 rounded ${
        isPublic
          ? "bg-green-500 hover:bg-green-600"
          : "bg-gray-500 hover:bg-gray-600"
      } ${loading && "opacity-50 cursor-not-allowed"}`}
    >
      {loading ? "Updating..." : isPublic ? "Public" : "Private"}
    </button>
  );
};

export default PublicToggle;
