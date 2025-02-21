import { db } from "@/lib/db";
import { fetchMovieDetails } from "@/app/api/movies";
import { notFound } from "next/navigation";

export default async function ListPage({ params: paramsPromise }) {
  const params = await paramsPromise;
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
      <div className="flex flex-col items-center max-w-5xl gap-6 mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-amber-500">
          {listDetails.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Created: {new Date(listDetails.created_at).toLocaleDateString()}
        </p>

        {/* Movie List */}
        <ul className="flex flex-wrap justify-center gap-4">
          {itemsWithTitles.map((item, index) => (
            <li
              key={item.tmdb_id}
              className="relative flex flex-col items-center w-40 p-3 bg-gray-700 rounded-lg shadow-md dark:bg-gray-800 sm:w-48"
            >
              {/* Ranking Number */}
              <div className="absolute flex items-center justify-center text-sm font-bold text-white bg-blue-500 rounded-full w-7 h-7 left-2 top-2">
                {index + 1}
              </div>

              {/* Movie Poster */}
              <div className="w-32 h-48 overflow-hidden rounded-md shadow-md sm:w-40 sm:h-60">
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-800 rounded-md">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              {/* Movie Title & Position */}
              <p className="mt-2 text-sm font-semibold text-center text-gray-300 sm:text-base">
                {item.title}
              </p>
              <p className="text-sm text-gray-400">Position: {item.position}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
