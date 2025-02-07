const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDM_API_KEY;
const language = "en-US";
const includeAdult = false;
const originCountry = "US";

// Fetch TV shows using the "Discover" endpoint
export async function fetchDiscoverTVShows(page, year = 2024) {
  const sortBy = "vote_count.desc";
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const url =
    `${baseUrl}/discover/tv?air_date.gte=${startDate}&air_date.lte=${endDate}` +
    `&sort_by=${sortBy}&language=${language}&page=${page}&include_adult=${includeAdult}` +
    `&with_origin_country=${originCountry}`;

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
export async function fetchSearchTVShows(query, page, year = 2024) {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const url =
    `${baseUrl}/search/tv?query=${encodeURIComponent(query)}` +
    `&air_date.gte=${startDate}&air_date.lte=${endDate}` +
    `&language=${language}&page=${page}&include_adult=${includeAdult}` +
    `&with_origin_country=${originCountry}`;

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
export async function fetchPopularTVShows(page = 1, year = 2024) {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  const sortBy = "popularity.desc";

  const url =
    `${baseUrl}/discover/tv?air_date.gte=${startDate}&air_date.lte=${endDate}` +
    `&sort_by=${sortBy}&language=${language}&page=${page}&include_adult=${includeAdult}` +
    `&with_origin_country=${originCountry}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch popular TV shows: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}
