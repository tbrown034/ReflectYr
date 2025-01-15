import { db } from "@/lib/db";
import { fetchMovieDetails } from "@/app/api/movies";
import UserListControls from "../../movies/UserListFolder/UserListControls"; // Adjust the path if needed
import { notFound } from "next/navigation";

export default async function ListPage({ params: paramsPromise }) {
  // Await the params object
  const params = await paramsPromise;

  // Extract the listId from the route parameters
  const { listId } = params;

  // Fetch list details
  const list = await db.sql`
    SELECT * FROM lists WHERE list_id = ${listId};
  `;
  if (list.rows.length === 0) {
    return notFound();
  }

  const listDetails = list.rows[0];

  // Fetch list items
  const listItems = await db.sql`
    SELECT tmdb_id, position FROM list_items
    WHERE list_id = ${listId}
    ORDER BY position ASC;
  `;

  // Fetch movie details for each item
  const itemsWithTitles = await Promise.all(
    listItems.rows.map(async (item) => {
      const movie = await fetchMovieDetails(item.tmdb_id);
      return { ...item, title: movie.title, poster_path: movie.poster_path };
    })
  );

  return (
    <div className="min-h-screen p-8 text-gray-900 bg-gray-300 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* List Title */}
        <h1 className="mb-4 text-3xl font-extrabold text-amber-500">
          {listDetails.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Created: {new Date(listDetails.created_at).toLocaleDateString()}
        </p>

        {/* Movie Items */}
        <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {itemsWithTitles.map((item) => (
            <div
              key={item.tmdb_id}
              className="relative p-4 text-gray-200 bg-gray-700 rounded-lg shadow-md"
            >
              {/* Movie Poster */}
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title}
                  className="mb-4 rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-64 mb-4 bg-gray-800 rounded-lg">
                  <span>No Image</span>
                </div>
              )}
              {/* Movie Title */}
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-gray-400">Position: {item.position}</p>

              {/* Optional: Add controls to reorder/delete items */}
              <UserListControls tmdbId={item.tmdb_id} listId={listId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
