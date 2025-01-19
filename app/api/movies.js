// Location: app/api/movies.js
// Type: Helper file
// Purpose: Encapsulates TMDB API calls for reuse across components.

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDM_API_KEY;
const movieYear = 2024; // Release year filter
const language = "en-US"; // Language filter
const includeAdult = false; // Exclude adult content

// Fetch movies using the "Discover" endpoint
export async function fetchDiscoverMovies(page) {
  const sortBy = "vote_count.desc";

  const url =
    `${baseUrl}/discover/movie?primary_release_year=${movieYear}` +
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
export async function fetchSearchResults(query, page) {
  const url =
    `${baseUrl}/search/movie?query=${encodeURIComponent(query)}` +
    `&primary_release_year=${movieYear}&language=${language}&page=${page}&include_adult=${includeAdult}`;

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
// Fetch popular TV shows, limited to 10 US shows
export async function fetchTrendingShows(limit = 10) {
  const url = `${baseUrl}/discover/tv?language=${language}&page=1&sort_by=popularity.desc&with_origin_country=US`;

  console.log("Fetching popular US TV shows...");
  console.log(`Request URL: ${url}`);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store", // Prevent caching for fresh data
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Error 401: Unauthorized. Check your API key.");
        throw new Error(
          "Unauthorized: Invalid API key. Please check your TMDB API key."
        );
      }
      console.error(`Fetch failed with status: ${response.status}`);
      throw new Error(`Failed to fetch popular TV shows: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched successfully:", data);

    // Limit the number of results to the specified limit
    return data.results.slice(0, limit);
  } catch (error) {
    console.error("Error during fetchTrendingShows:", error.message);
    throw error;
  }
}
// Fetch trending movies, limited to 10 results
export async function fetchTrendingMovies(limit = 10) {
  const url = `${baseUrl}/trending/movie/week?language=${language}`;

  console.log("Fetching trending movies...");
  console.log(`Request URL: ${url}`);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store", // Prevent caching for fresh data
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Error 401: Unauthorized. Check your API key.");
        throw new Error(
          "Unauthorized: Invalid API key. Please check your TMDB API key."
        );
      }
      console.error(`Fetch failed with status: ${response.status}`);
      throw new Error(`Failed to fetch trending movies: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched successfully:", data);

    // Limit the number of results to the specified limit
    return data.results.slice(0, limit) || [];
  } catch (error) {
    console.error("Error during fetchTrendingMovies:", error.message);
    throw error;
  }
}
