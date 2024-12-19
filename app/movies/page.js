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
    <main className="min-h-screen p-6 text-gray-100 bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-amber-400">
        Discover Movies
      </h1>
      <ListWrapper movies={movies} query={query} currentPage={page} />
    </main>
  );
}
