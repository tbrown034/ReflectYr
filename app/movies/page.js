// Location: app/movies/page.js
// Type: Server Component
// Purpose: Handles main movies page and fetches data based on search or default criteria.

import SearchBar from "@/app/UI/components/SearchBar";
import PaginationControls from "@/app/UI/components/PaginationControls";
import FullList from "./components/FullList";
import SearchList from "./components/SearchList";
import UserList from "./components/UserList";
import { fetchDiscoverMovies, fetchSearchResults } from "@/app/api/movies";

export default async function MoviesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || "";
  const page = parseInt(resolvedSearchParams.page || "1", 10);

  const movies = query
    ? await fetchSearchResults(query, page)
    : await fetchDiscoverMovies(page);

  return (
    <main className="p-6">
      <SearchBar />
      {query ? <SearchList movies={movies} /> : <FullList movies={movies} />}
      <PaginationControls currentPage={page} />
      <UserList /> {/* UserList added to the page */}
    </main>
  );
}
