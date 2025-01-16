"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "./Title";
import ActionButtons from "./ActionButtons";
import MoviesGrid from "./MoviesGrid";
import ShareModal from "./ShareModal";

export default function BaseList({
  temporaryListId,
  initialTitle,
  allowSave,
  session,
}) {
  const [movies, setMovies] = useState([]);
  const [listTitle, setListTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // Ensures boolean initialization
  const router = useRouter();

  // Load movies from localStorage when the component mounts
  useEffect(() => {
    const storedList = localStorage.getItem(`temporaryList-${temporaryListId}`);
    if (storedList) {
      try {
        setMovies(JSON.parse(storedList));
      } catch (error) {
        console.error("Error parsing stored list:", error);
      }
    }
  }, [temporaryListId]);

  const handleAddMore = () => {
    router.push("/movies");
  };

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen); // Toggle the modal state
  };

  const handleSaveList = async () => {
    if (!allowSave) {
      console.warn("Saving is not allowed.");
      return;
    }

    const payload = {
      title: listTitle,
      movies: movies.map((movie, index) => ({
        tmdb_id: movie.id,
        position: index + 1,
      })),
    };

    try {
      const response = await fetch("/api/save-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("List saved successfully!");
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleMoveDown = (index) => {
    if (index === movies.length - 1) return;
    const updatedList = [...movies];
    [updatedList[index], updatedList[index + 1]] = [
      updatedList[index + 1],
      updatedList[index],
    ];
    setMovies(updatedList);
  };

  const handleRemove = (index) => {
    const updatedList = movies.filter((_, i) => i !== index);
    setMovies(updatedList);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div
        id="shareable-content"
        className="flex flex-col items-center gap-6 p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800"
      >
        {/* Title component */}
        <Title
          listTitle={listTitle}
          isEditing={isEditing}
          onTitleChange={(e) => setListTitle(e.target.value)}
          onSave={() => setIsEditing(false)}
        />

        {/* MoviesGrid component */}
        <MoviesGrid
          movies={movies}
          isEditing={isEditing}
          onMoveDown={handleMoveDown}
          onRemove={handleRemove}
        />
      </div>

      {/* ActionButtons component */}
      <ActionButtons
        isEditing={isEditing}
        onAddMore={handleAddMore}
        onEditToggle={handleEditToggle}
        onSaveList={handleSaveList}
        onDownloadImage={toggleShareModal}
        showSaveList={!!session?.user} // Check if session.user exists
      />

      {/* ShareModal component */}
      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen} // Explicitly pass the boolean state
          onClose={toggleShareModal}
          listTitle={listTitle}
          movies={movies}
        />
      )}
    </div>
  );
}
