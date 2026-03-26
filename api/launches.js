let cache = null;
let cacheTime = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  // Return cached data if fresh
  if (cache && Date.now() - cacheTime < CACHE_TTL) {
    return res.status(200).json(cache);
  }

  const limit = req.query.limit || 15;
  const url = `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&mode=detailed`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Rate limited - return stale cache if available
      if (cache) return res.status(200).json(cache);
      return res.status(response.status).json({ error: 'API unavailable' });
    }

    const data = await response.json();
    cache = data;
    cacheTime = Date.now();
    return res.status(200).json(data);
  } catch (err) {
    if (cache) return res.status(200).json(cache);
    return res.status(500).json({ error: err.message });
  }
}
