import { fetchDiscoverMovies, fetchSearchResults } from "@/app/api/movies";
import ListWrapper from "./ListWrapper";

export default async function MoviesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || "";
  const page = parseInt(resolvedSearchParams.page || "1", 10);

  // Fetch movies based on the query
  const movies = query
    ? await fetchSearchResults(query, page)
    : await fetchDiscoverMovies(page);

  return (
    <main className="p-2">
      <ListWrapper movies={movies} query={query} currentPage={page} />
    </main>
  );
}
