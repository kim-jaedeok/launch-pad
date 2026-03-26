import { API } from '../config/api';
import { LAUNCH_CACHE_TTL } from '../config/constants';
import { fetchJSON, HttpError } from './httpClient';
import type { LaunchesResponse } from '../types/launch';

const CACHE_KEY = 'space_observer_launches';

interface CachedData {
  data: LaunchesResponse;
  timestamp: number;
}

function getCached(): LaunchesResponse | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedData = JSON.parse(raw);
    if (Date.now() - cached.timestamp > LAUNCH_CACHE_TTL) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function setCache(data: LaunchesResponse): void {
  try {
    sessionStorage.setItem(
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

  const url = `${API.launches.base}${API.launches.upcoming}?limit=${limit}&mode=detailed`;

  try {
    const data = await fetchJSON<LaunchesResponse>(url);
    setCache(data);
    return data;
  } catch (err) {
    if (err instanceof HttpError && err.status === 429 && cached) {
      return cached;
    }
    if (cached) return cached;
    throw err;
  }
}
