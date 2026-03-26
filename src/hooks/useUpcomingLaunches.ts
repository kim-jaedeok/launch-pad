import { useState, useEffect, useCallback } from 'react';
import { getUpcomingLaunches } from '../services/launchService';
import { LAUNCH_REFRESH_INTERVAL } from '../config/constants';
import type { Launch } from '../types/launch';

interface UseLaunchesResult {
  launches: Launch[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUpcomingLaunches(limit = 10): UseLaunchesResult {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLaunches = useCallback(async () => {
    try {
      setError(null);
      const data = await getUpcomingLaunches(limit);
      setLaunches(data.results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLaunches();
    const id = setInterval(fetchLaunches, LAUNCH_REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [fetchLaunches]);

  return { launches, isLoading, error, refetch: fetchLaunches };
}
