import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://cswrwxkjsfxcaoboihdy.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const BASE_URL = 'https://www.lgtecserv.com';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  slug: string;
  stock: number;
  categories?: { name: string; slug: string } | null;
  product_images?: Array<{ image_url: string; is_primary: boolean }>;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function stripEmojis(text: string): string {
  return text.replace(/[\u{1F600}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u200D]|[\u{20E3}]|[\u{E0020}-\u{E007F}]|[✨🔥📦📱⚡️®️™️]/gu, '').trim();
}

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/products?slug=eq.${encodeURIComponent(slug)}&select=*,categories(name,slug),product_images(image_url,is_primary)`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data?.[0] || null;
  } catch {
    return null;
  }
}

function generateProductHtml(product: Product, path: string): string {
  const imageUrl = product.image_url ||
    product.product_images?.find(img => img.is_primary)?.image_url ||
    product.product_images?.[0]?.image_url ||
    `${BASE_URL}/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.png`;

  const cleanName = stripEmojis(product.name);
  const cleanDescription = stripEmojis(product.description);
  const title = `${cleanName} - Comprar em Moçambique | LG TecServ`;
  const description = `${cleanDescription.substring(0, 150)}. Preço: ${product.price.toLocaleString('pt-MZ')} MZN. ${product.stock > 0 ? 'Em estoque' : 'Sob consulta'}. Entrega em Maputo.`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const categoryName = product.categories?.name || 'Produtos';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": cleanName,
    "description": cleanDescription.substring(0, 500),
    "image": imageUrl,
    "sku": product.id,
    "brand": { "@type": "Brand", "name": "LG TecServ" },
    "category": categoryName,
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "MZN",
      "price": product.price.toString(),
      "availability": product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "LG TecServ",
        "url": BASE_URL
      },
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Loja", "item": `${BASE_URL}/loja` },
      ...(product.categories ? [{ "@type": "ListItem", "position": 3, "name": product.categories.name, "item": `${BASE_URL}/loja/${product.categories.slug}` }] : []),
      { "@type": "ListItem", "position": product.categories ? 4 : 3, "name": cleanName, "item": canonicalUrl }
    ]
  };

  return `<!DOCTYPE html>
<html lang="pt-MZ">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="keywords" content="${escapeHtml(cleanName)}, ${escapeHtml(categoryName)}, comprar ${escapeHtml(cleanName.toLowerCase())} moçambique, loja online moçambique" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="LG TecServ" />
  <meta name="geo.region" content="MZ" />
  <meta name="geo.placename" content="Maputo, Moçambique" />
  <meta name="content-language" content="pt-MZ" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" href="/lovable-uploads/7c383221-e93f-4908-a3ab-03f2194a4b5b.png" type="image/png" />

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="product" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${escapeHtml(imageUrl)}" />
  <meta property="og:site_name" content="LG TecServ" />
  <meta property="og:locale" content="pt_MZ" />
  <meta property="product:price:amount" content="${product.price}" />
  <meta property="product:price:currency" content="MZN" />
  <meta property="product:availability" content="${product.stock > 0 ? 'in stock' : 'out of stock'}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  <meta name="twitter:site" content="@lgtecserv" />

  <!-- Structured Data -->
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbData)}</script>

  <!-- Redirect user to SPA after brief delay (for non-bot visitors that slip through) -->
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}" />
</head>
<body>
  <header>
    <nav>
      <a href="${BASE_URL}">LG TecServ</a> &gt;
      <a href="${BASE_URL}/loja">Loja</a> &gt;
      ${product.categories ? `<a href="${BASE_URL}/loja/${product.categories.slug}">${escapeHtml(product.categories.name)}</a> &gt;` : ''}
      <span>${escapeHtml(cleanName)}</span>
    </nav>
  </header>
  <main>
    <article itemscope itemtype="https://schema.org/Product">
      <h1 itemprop="name">${escapeHtml(cleanName)}</h1>
      <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(cleanName)} - Comprar em Moçambique" itemprop="image" width="800" height="800" />
      <div itemprop="description">
        <p>${escapeHtml(cleanDescription.substring(0, 1000))}</p>
      </div>
      <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
        <p>Preço: <span itemprop="price" content="${product.price}">${product.price.toLocaleString('pt-MZ')}</span> <span itemprop="priceCurrency">MZN</span></p>
        <p>Disponibilidade: <span itemprop="availability" content="${product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}">${product.stock > 0 ? 'Em estoque' : 'Vendido'}</span></p>
        <meta itemprop="url" content="${canonicalUrl}" />
      </div>
      <p>Categoria: <span itemprop="category">${escapeHtml(categoryName)}</span></p>
    </article>
  </main>
  <footer>
    <p>&copy; ${new Date().getFullYear()} LG TecServ - Soluções Digitais Completas em Moçambique</p>
    <p>Contacto: +258 86 982 4047 | contato@lgtecserv.com</p>
  </footer>
</body>
</html>`;
}

function generateGenericHtml(path: string, title: string, description: string): string {
  const canonicalUrl = `${BASE_URL}${path}`;
  return `<!DOCTYPE html>
<html lang="pt-MZ">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${BASE_URL}/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.png" />
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}" />
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = (req.query.path as string) || '/';

  // Product page: /loja/:category/:slug
  const productMatch = path.match(/^\/loja\/([^/]+)\/([^/]+)$/);
  if (productMatch) {
    const slug = productMatch[2];
    const product = await fetchProduct(slug);
    if (product) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      return res.status(200).send(generateProductHtml(product, path));
    }
  }

  // Product page: /produto/:slug
  const productMatch2 = path.match(/^\/produto\/([^/]+)$/);
  if (productMatch2) {
    const slug = productMatch2[1];
    const product = await fetchProduct(slug);
    if (product) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      return res.status(200).send(generateProductHtml(product, path));
    }
  }

  // Shop page: /loja
  if (path === '/loja' || path.match(/^\/loja\/[^/]+$/)) {
    const categorySlug = path.replace('/loja/', '').replace('/loja', '');
    const title = categorySlug
      ? `Loja Online - ${categorySlug} - Compre em Moçambique | LG TecServ`
      : 'Loja Online - Compre em Moçambique | LG TecServ';
    const description = 'Descubra nossa loja online com produtos de qualidade e entrega em todo Moçambique. Pagamento seguro, preços competitivos e atendimento personalizado.';
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    return res.status(200).send(generateGenericHtml(path, title, description));
  }

  // Fallback: redirect to original page
  return res.redirect(307, `${BASE_URL}${path}`);
}
