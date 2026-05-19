// Bot user-agent patterns for search engine crawlers
const BOT_PATTERNS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'slurp',        // Yahoo
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'applebot',
  'semrushbot',
  'ahrefsbot',
  'mj12bot',
  'petalbot',
];

// Paths that should be pre-rendered for bots
const PRERENDER_PATHS = [
  /^\/loja\/[^/]+\/[^/]+$/,  // /loja/:category/:slug (product pages)
  /^\/produto\/[^/]+$/,       // /produto/:slug (product pages)
  /^\/loja$/,                  // /loja (shop page)
  /^\/loja\/[^/]+$/,          // /loja/:category (category pages)
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some(pattern => ua.includes(pattern));
}

function shouldPrerender(pathname: string): boolean {
  return PRERENDER_PATHS.some(pattern => pattern.test(pathname));
}

export const config = {
  matcher: [
    // Match product pages, shop pages
    '/loja/:path*',
    '/produto/:path*',
  ],
};

export default async function middleware(req: Request) {
  const userAgent = req.headers.get('user-agent') || '';
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Only prerender for bots on specific paths
  if (isBot(userAgent) && shouldPrerender(pathname)) {
    const prerenderUrl = new URL('/api/prerender', req.url);
    prerenderUrl.searchParams.set('path', pathname);
    
    try {
      // Fetch the prerendered HTML and return it as the response
      return await fetch(prerenderUrl.toString());
    } catch (e) {
      console.error('Prerender fetch failed:', e);
      // Fall back to normal routing if fetch fails
    }
  }

  // For regular users, let the request continue to its original destination
  return new Response(null, {
    headers: {
      'x-middleware-next': '1',
    },
  });
}

