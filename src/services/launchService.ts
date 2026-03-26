import { API } from '../config/api';
import { LAUNCH_CACHE_TTL } from '../config/constants';
import { fetchJSON, HttpError } from './httpClient';
import type { LaunchesResponse } from '../types/launch';

const CACHE_KEY = 'launch_pad_data';

interface CachedData {
  data: LaunchesResponse;
  timestamp: number;
}

function getCached(): { data: LaunchesResponse; fresh: boolean } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedData = JSON.parse(raw);
    const fresh = Date.now() - cached.timestamp < LAUNCH_CACHE_TTL;
    return { data: cached.data, fresh };
  } catch {
    return null;
  }
}

function setCache(data: LaunchesResponse): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() }),
    );
  } catch {
    // Storage full - ignore
  }
}

export async function getUpcomingLaunches(
  limit = 10,
): Promise<LaunchesResponse> {
  const cached = getCached();

  // Return fresh cache without API call
  if (cached?.fresh) {
    return cached.data;
  }

  const url = `${API.launches.base}${API.launches.upcoming}?limit=${limit}&mode=detailed`;

  try {
    const data = await fetchJSON<LaunchesResponse>(url);
    setCache(data);
    return data;
  } catch (err) {
    // On any error, return stale cache if available
    if (cached) return cached.data;
    if (err instanceof HttpError && err.status === 429) {
      throw new Error('API rate limit reached. Please try again in a few minutes.');
    }
    throw err;
  }
}
