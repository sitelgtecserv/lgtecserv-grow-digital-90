/**
 * IndexNow client utility — auto-ping Bing/Yandex for instant indexing
 * when products are saved/published in the admin panel.
 */

const BASE_URL = 'https://www.lgtecserv.com';

interface IndexNowResult {
  success: boolean;
  urlsSubmitted: number;
  results: Array<{ engine: string; status: number | string }>;
}

/**
 * Notify search engines about new or updated URLs via IndexNow.
 * Pings Bing, IndexNow (Yandex/Seznam/Naver), and Google sitemap.
 */
export async function pingIndexNow(urls: string[]): Promise<IndexNowResult | null> {
  if (!urls || urls.length === 0) return null;

  // Ensure all URLs are absolute
  const absoluteUrls = urls.map(url =>
    url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? url : '/' + url}`
  );

  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: absoluteUrls }),
    });

    if (!response.ok) {
      console.warn('[IndexNow] Falha ao pingar:', response.status);
      return null;
    }

    const result: IndexNowResult = await response.json();
    console.log(`[IndexNow] ✅ ${result.urlsSubmitted} URLs submetidas:`, result.results);
    return result;
  } catch (error) {
    console.error('[IndexNow] ❌ Erro ao notificar motores de busca:', error);
    return null;
  }
}

/**
 * Generate the product URL based on category and slug.
 */
export function getProductUrl(slug: string, categorySlug?: string | null): string {
  return categorySlug ? `/loja/${categorySlug}/${slug}` : `/produto/${slug}`;
}

/**
 * Convenience: ping IndexNow for a single product.
 */
export async function pingProductIndexNow(
  slug: string,
  categorySlug?: string | null
): Promise<IndexNowResult | null> {
  const url = getProductUrl(slug, categorySlug);
  return pingIndexNow([url, '/loja', '/sitemap.xml']);
}
