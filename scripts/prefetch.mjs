import fs from 'fs';

const url = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=15&mode=detailed';

try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  fs.writeFileSync('public/launches.json', JSON.stringify(data));
  console.log(`Prefetched ${data.results.length} launches`);
} catch (err) {
  console.warn('Prefetch failed, using empty fallback:', err.message);
  fs.writeFileSync('public/launches.json', JSON.stringify({
    results: [], count: 0, next: null, previous: null,
  }));
}
