import type { VercelRequest, VercelResponse } from '@vercel/node';

const INDEXNOW_KEY = 'a7f9b8c2d1e44a6ea214972f3e8b5c90';
const HOST = 'www.lgtecserv.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { urls } = req.body as { urls?: string[] };

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid "urls" array in body' });
  }

  // Ensure all URLs are absolute
  const absoluteUrls = urls.map(url =>
    url.startsWith('http') ? url : `https://${HOST}${url.startsWith('/') ? url : '/' + url}`
  );

  const indexNowPayload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: absoluteUrls,
  };

  const results: { engine: string; status: number | string }[] = [];

  // Ping IndexNow API (covers Bing, Yandex, Seznam, Naver)
  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(indexNowPayload),
      });
      results.push({
        engine: endpoint.includes('bing') ? 'Bing' : 'IndexNow',
        status: response.status,
      });
    } catch (error: any) {
      results.push({
        engine: endpoint.includes('bing') ? 'Bing' : 'IndexNow',
        status: `Error: ${error.message}`,
      });
    }
  }

  // Also ping Google's Indexing API via sitemap ping
  try {
    const sitemapUrl = encodeURIComponent(`https://${HOST}/sitemap.xml`);
    const googlePing = await fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`);
    results.push({ engine: 'Google Sitemap Ping', status: googlePing.status });
  } catch (error: any) {
    results.push({ engine: 'Google Sitemap Ping', status: `Error: ${error.message}` });
  }

  return res.status(200).json({
    success: true,
    urlsSubmitted: absoluteUrls.length,
    results,
  });
}
