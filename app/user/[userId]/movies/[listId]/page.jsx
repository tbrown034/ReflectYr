import FinalizedListClient from "./FinalizedListClient";

export default async function UserMovieListPage({ params: paramsPromise }) {
  // Await the params object
  const params = await paramsPromise;

  // Extract userId and listId from the resolved params
  const { userId, listId } = params;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Your Finalized Movie List</h1>
      {/* Pass the userId and listId to the Client Component */}
      <FinalizedListClient userId={userId} listId={listId} />
    </div>
  );
}
