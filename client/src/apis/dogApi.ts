// Base URL for the Fetch take-home API
const API_BASE = 'https://frontend-take-home-service.fetch.com';

/**
 * Wrapper for fetch that automatically includes credentials (cookies)
 * Required because authentication relies on HttpOnly cookies
 */
const fetchWithCredentials = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Ensures auth cookie is sent with request
  });
  if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
  return response.json();
};

// -------------------- AUTH --------------------

/**
 * Logs in a user using their name and email.
 * A successful login sets a secure auth cookie automatically (HttpOnly).
 */
export const loginUser = async (name: string, email: string) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }
};

/**
 * Logs the user out by invalidating the auth cookie on the server.
 */
export const logoutUser = async () => {
  await fetchWithCredentials(`${API_BASE}/auth/logout`, {
    method: 'POST',
  });
};

// -------------------- DOGS --------------------

/**
 * Fetches a list of all available dog breeds for use in filtering.
 */
export const fetchBreeds = async (): Promise<string[]> => {
  return fetchWithCredentials(`${API_BASE}/dogs/breeds`);
};

/**
 * Search parameters for the /dogs/search endpoint.
 * All fields are optional.
 */
interface SearchDogsParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: 'breed:asc' | 'breed:desc' | 'name:asc' | 'name:desc' | 'age:asc' | 'age:desc';
}

/**
 * Performs a dog search with optional filters (breed, age, zip, etc.)
 * Returns an object with resultIds, total count, and pagination cursors.
 */
export const searchDogs = async (params: SearchDogsParams) => {
  const searchParams = new URLSearchParams();
  if (params.breeds) params.breeds.forEach((b) => searchParams.append('breeds', b));
  if (params.zipCodes) params.zipCodes.forEach((z) => searchParams.append('zipCodes', z));
  if (params.ageMin !== undefined) searchParams.append('ageMin', String(params.ageMin));
  if (params.ageMax !== undefined) searchParams.append('ageMax', String(params.ageMax));
  if (params.size !== undefined) searchParams.append('size', String(params.size));
  if (params.from !== undefined) searchParams.append('from', String(params.from));
  if (params.sort) searchParams.append('sort', params.sort);

  return fetchWithCredentials(`${API_BASE}/dogs/search?${searchParams.toString()}`);
};

/**
 * Given a list of dog IDs, fetches full dog objects.
 * Used after search to get actual dog details from resultIds.
 */
export const fetchDogsByIds = async (dogIds: string[]) => {
  return fetchWithCredentials(`${API_BASE}/dogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dogIds),
  });
};

/**
 * Sends a list of favorite dog IDs to get a single matched dog.
 * The API returns a match ID; we use that ID to fetch dog details.
 */
export const generateMatch = async (dogIds: string[]) => {
  return fetchWithCredentials(`${API_BASE}/dogs/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dogIds),
  });
};

// -------------------- LOCATIONS --------------------

/**
 * Given a list of zip codes, returns full location info (city, state, etc.)
 */
export const fetchLocationsByZipCodes = async (zipCodes: string[]) => {
  return fetchWithCredentials(`${API_BASE}/locations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(zipCodes),
  });
};

/**
 * Search parameters for filtering locations by geography or city/state.
 * Used for more advanced filtering or mapping features.
 */
interface LocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    bottom_left?: { lat: number; lon: number };
    top_left?: { lat: number; lon: number };
    bottom_right?: { lat: number; lon: number };
    top_right?: { lat: number; lon: number };
  };
  size?: number;
  from?: number;
}

/**
 * Performs a location search using city name, states, or geo bounding box.
 * Used for integrating map or zip code-based dog searches.
 */
export const searchLocations = async (params: LocationSearchParams) => {
  return fetchWithCredentials(`${API_BASE}/locations/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
};
