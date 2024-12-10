// Location: app/movies/page.js
// Type: Server Component
// Purpose: Handles the main movies page. Fetches data from TMDB using either Discover API (default) or Search API (if query exists). Displays SearchBar, MoviesList, and PaginationControls.

import SearchBar from "@/app/UI/components/SearchBar";
import PaginationControls from "@/app/UI/components/PaginationControls";
import FullList from "./components/FullList";
import SearchList from "./components/SearchList";

async function fetchDiscoverMovies(page) {
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&language=en-US&page=${page}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.TMDM_API_KEY}` },
  });
  const data = await response.json();
  return data.results;
}

async function fetchSearchResults(query, page) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&language=en-US&page=${page}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.TMDM_API_KEY}` },
  });
  const data = await response.json();
  return data.results;
}

export default async function MoviesPage({ searchParams }) {
  // Await the promise to resolve and then access its properties
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams.query || ""; // Search query
  const page = resolvedSearchParams.page || 1; // Pagination

  const movies = query
    ? await fetchSearchResults(query, page)
    : await fetchDiscoverMovies(page);

  return (
    <main className="p-6">
      <SearchBar />
      {query ? <SearchList movies={movies} /> : <FullList movies={movies} />}
      <PaginationControls currentPage={page} />
    </main>
  );
}
