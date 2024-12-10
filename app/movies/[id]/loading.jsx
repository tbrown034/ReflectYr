// Location: app/movies/[id]/loading.jsx
// Type: Client Component
// Purpose: Displays a skeleton loading screen for movie details.

export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Loading Movie...</h1>
      <p className="text-gray-500">
        Please wait while we fetch the movie details.
      </p>
    </div>
  );
}
