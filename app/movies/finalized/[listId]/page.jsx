import { redirect } from "next/navigation";

export default async function FinalizedListPage({ params: paramsPromise }) {
  // Await the params object for dynamic routes
  const params = await paramsPromise;

  // Extract the listId from the route parameters
  const { listId } = params;

  // Fetch the list from localStorage using the unique list ID
  let savedList;
  if (typeof window === "undefined") {
    // This block will NOT execute server-side because localStorage is unavailable
    savedList = [];
  } else {
    savedList = JSON.parse(localStorage.getItem(`userList-${listId}`) || "[]");
  }

  // Redirect if no list is found
  if (!savedList || savedList.length === 0) {
    redirect("/movies");
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Your Finalized Movie List</h1>
      <ol className="list-decimal list-inside">
        {savedList.map((movie, index) => (
          <li key={index} className="mb-2">
            {movie.title}
          </li>
        ))}
      </ol>
      <button
        onClick={() => navigator.clipboard.writeText(window.location.href)}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-800"
      >
        Copy Shareable Link
      </button>
    </div>
  );
}
