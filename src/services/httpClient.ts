interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export async function fetchJSON<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { timeout = 10000, retries = 2, ...fetchOpts } = options;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOpts,
        signal: controller.signal,
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitMs = retryAfter ? parseInt(retryAfter) * 1000 : 60000;
        throw new HttpError(429, `Rate limited. Retry after ${waitMs}ms`);
      }

      if (!response.ok) {
        throw new HttpError(response.status, `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json() as T;
    } catch (err) {
      lastError = err as Error;

      if (err instanceof HttpError && err.status === 429) {
        throw err;
      }

      if ((err as Error).name === 'AbortError') {
        lastError = new Error('Request timed out');
      }

      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw lastError ?? new Error('Request failed');
}
