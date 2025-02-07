const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDM_API_KEY;
const language = "en-US";
const includeAdult = false;

// Fetch movies using the "Discover" endpoint
export async function fetchDiscoverMovies(page, year = 2024) {
  const sortBy = "vote_count.desc";

  const url =
    `${baseUrl}/discover/movie?primary_release_year=${year}` +
    `&sort_by=${sortBy}&language=${language}&page=${page}&include_adult=${includeAdult}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch discover movies: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}

// Fetch search results for movies
export async function fetchSearchResults(query, page, year = 2024) {
  const url =
    `${baseUrl}/search/movie?query=${encodeURIComponent(query)}` +
    `&primary_release_year=${year}&language=${language}&page=${page}&include_adult=${includeAdult}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch search results: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}

// Fetch movie details by ID
export async function fetchMovieDetails(movieId) {
  const url = `${baseUrl}/movie/${movieId}?language=${language}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for ID: ${movieId}`);
  }

  const data = await response.json();
  return data;
}
