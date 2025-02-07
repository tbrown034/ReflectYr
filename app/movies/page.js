import { fetchDiscoverMovies, fetchSearchResults } from "@/app/api/movies";
import ListWrapper from "./ListsWrapper";

export default async function MoviesPage({ searchParams }) {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || "";
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const year = resolvedSearchParams.year
    ? parseInt(resolvedSearchParams.year, 10)
    : 2025;

  // Fetch movies based on the query using the selected year
  const movies = query
    ? await fetchSearchResults(query, page, year)
    : await fetchDiscoverMovies(page, year);

  return (
    <main className="p-2">
      <h2 className="p-4 text-xl font-bold">
        <span className="inline-block px-5 py-2 text-lg font-semibold text-black rounded-full bg-amber-500">
          Movies
        </span>
      </h2>
      <ListWrapper movies={movies} query={query} currentPage={page} />
    </main>
  );
}
