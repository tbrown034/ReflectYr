"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "./Title";
import ActionButtons from "./ActionButtons";
import MoviesGrid from "./MoviesGrid"; // Updated import
import ShareModal from "./ShareModal";

export default function BaseList({ temporaryListId, initialTitle, allowSave }) {
  const [movies, setMovies] = useState([]);
  const [listTitle, setListTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const router = useRouter();

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

  const handleAddMore = () => router.push("/movies");

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
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

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div
        id="shareable-content"
        className="flex flex-col items-center gap-6 p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800"
      >
        <Title
          listTitle={listTitle}
          isEditing={isTitleEditing}
          onTitleChange={(e) => setListTitle(e.target.value)}
          onSave={() => setIsTitleEditing(false)}
        />

        {/* MoviesGrid */}
        <MoviesGrid
          movies={movies}
          isEditing={isEditing}
          onMoveDown={handleMoveDown}
          onRemove={handleRemove}
        />
      </div>

      <ActionButtons
        isEditing={isEditing}
        isTitleEditing={isTitleEditing}
        onAddMore={handleAddMore}
        onEditList={() => setIsEditing(true)}
        onFinalizeList={() => setIsEditing(false)}
        onEditTitle={() => setIsTitleEditing(true)}
        onSaveList={handleSaveList}
        onDownloadImage={toggleShareModal}
      />

      {isShareModalOpen && (
        <ShareModal
          listTitle={listTitle}
          movies={movies}
          onClose={toggleShareModal}
        />
      )}
    </div>
  );
}
