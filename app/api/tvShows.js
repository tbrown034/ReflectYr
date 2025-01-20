// Location: app/api/tvShows.js
// Type: Helper file
// Purpose: Encapsulates TMDB API calls for TV shows.

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDM_API_KEY; // Ensure your API key is set in .env
const tvYear = 2024; // Default release year filter
const language = "en-US"; // Language filter
const includeAdult = false; // Exclude adult content
const originCountry = "US"; // Restrict to US-origin shows

// Fetch TV shows using the "Discover" endpoint
export async function fetchDiscoverTVShows(page, year = tvYear) {
  const sortBy = "vote_count.desc"; // Sort by vote count (popularity)
  const startDate = `${year}-01-01`; // Start of the year
  const endDate = `${year}-12-31`; // End of the year

  const url =
    `${baseUrl}/discover/tv?air_date.gte=${startDate}&air_date.lte=${endDate}` +
    `&sort_by=${sortBy}&language=${language}&page=${page}&include_adult=${includeAdult}` +
    `&with_origin_country=${originCountry}`; // Restrict to US shows

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch discover TV shows: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}

// Fetch search results for TV shows
export async function fetchSearchTVShows(query, page, year = tvYear) {
  const startDate = `${year}-01-01`; // Start of the year
  const endDate = `${year}-12-31`; // End of the year

  const url =
    `${baseUrl}/search/tv?query=${encodeURIComponent(query)}` +
    `&air_date.gte=${startDate}&air_date.lte=${endDate}` +
    `&language=${language}&page=${page}&include_adult=${includeAdult}` +
    `&with_origin_country=${originCountry}`; // Restrict to US shows

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch search results for TV shows: ${response.status}`
    );
  }

  const data = await response.json();
  return data.results || [];
}

// Fetch TV show details by ID
export async function fetchTVShowDetails(tvShowId) {
  const url = `${baseUrl}/tv/${tvShowId}?language=${language}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch TV show details for ID: ${tvShowId}`);
  }

  const data = await response.json();
  return data;
}

// Fetch popular TV shows using the "Discover" endpoint with advanced filtering
export async function fetchPopularTVShows(page = 1, year = tvYear) {
  const startDate = `${year}-01-01`; // Start of the year
  const endDate = `${year}-12-31`; // End of the year
  const sortBy = "popularity.desc"; // Sort by popularity

  const url =
    `${baseUrl}/discover/tv?air_date.gte=${startDate}&air_date.lte=${endDate}` +
    `&sort_by=${sortBy}&language=${language}&page=${page}&include_adult=${includeAdult}` +
    `&with_origin_country=${originCountry}`; // Restrict to US shows

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch popular TV shows: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}
