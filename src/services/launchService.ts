import { API } from '../config/api';
import { LAUNCH_CACHE_TTL } from '../config/constants';
import { fetchJSON } from './httpClient';
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
    // Storage full
  }
}

async function getPrefetched(): Promise<LaunchesResponse | null> {
  try {
    const res = await fetch('/launches.json');
    if (!res.ok) return null;
    return await res.json() as LaunchesResponse;
  } catch {
    return null;
  }
}

export async function getUpcomingLaunches(
  limit = 15,
): Promise<LaunchesResponse> {
  // 1. Fresh localStorage cache
  const cached = getCached();
  if (cached?.fresh) return cached.data;

  // 2. Try live API
  const url = `${API.launches.base}${API.launches.upcoming}?limit=${limit}&mode=detailed`;
  try {
    const data = await fetchJSON<LaunchesResponse>(url);
    setCache(data);
    return data;
  } catch {
    // 3. Stale cache
    if (cached) return cached.data;

    // 4. Build-time prefetched data (always available)
    const prefetched = await getPrefetched();
    if (prefetched && prefetched.results.length > 0) {
      setCache(prefetched);
      return prefetched;
    }

    throw new Error('Unable to load launch data. Please try again later.');
  }
}
