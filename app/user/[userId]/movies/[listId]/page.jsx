import FinalizedListClient from "./FinalizedListClient";

export default async function UserMovieListPage({ params: paramsPromise }) {
  // Await the params object
  const params = await paramsPromise;

  // Extract userId and listId from the resolved params
  const { userId, listId } = params;

  return (
    <div>
      <FinalizedListClient userId={userId} listId={listId} />
    </div>
  );
}
