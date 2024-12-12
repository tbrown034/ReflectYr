// Location: app/movies/page.js
// Type: Server Component
// Purpose: Handles main movies page and fetches data based on search or default criteria.

import { fetchDiscoverMovies, fetchSearchResults } from "@/app/api/movies";
import ListWrapper from "./ListWrapper";

export default async function MoviesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || "";
  const page = parseInt(resolvedSearchParams.page || "1", 10);

  const movies = query
    ? await fetchSearchResults(query, page)
    : await fetchDiscoverMovies(page);

  return (
    <main className="p-6">
      <ListWrapper movies={movies} query={query} currentPage={page} />
    </main>
  );
}
