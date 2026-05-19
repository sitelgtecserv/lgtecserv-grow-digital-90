import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://cswrwxkjsfxcaoboihdy.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const BASE_URL = 'https://www.lgtecserv.com';

interface Product {
  id: string;
  name: string;
  slug: string;
  updated_at: string;
  image_url: string | null;
  categories?: { slug: string } | null;
  product_images?: Array<{ image_url: string; is_primary: boolean }>;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

function stripEmojis(text: string): string {
  return text.replace(/[\u{1F600}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u200D]|[\u{20E3}]|[\u{E0020}-\u{E007F}]|[✨🔥📦📱⚡️®️™️]/gu, '').trim();
}

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/sobre-nos-lg-tecserv-mocambique', priority: '0.8', changefreq: 'monthly' },
  { url: '/servicos-lg-tecserv-mocambique', priority: '0.9', changefreq: 'weekly' },
  { url: '/servicos/criacao-desenvolvimento-sites-profissionais-mocambique', priority: '0.8', changefreq: 'monthly' },
  { url: '/servicos/design-grafico-profissional-mocambique', priority: '0.8', changefreq: 'monthly' },
  { url: '/servicos/gestao-trafego-pago-marketing-digital-mocambique', priority: '0.8', changefreq: 'monthly' },
  { url: '/servicos/gestao-redes-sociais-marketing-digital-mocambique', priority: '0.8', changefreq: 'monthly' },
  { url: '/servicos/consultoria-marketing-digital-estrategico-mocambique', priority: '0.8', changefreq: 'monthly' },
  { url: '/servicos/instalacoes-eletricas-profissionais-mocambique', priority: '0.8', changefreq: 'monthly' },
  { url: '/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique', priority: '0.7', changefreq: 'monthly' },
  { url: '/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique', priority: '0.7', changefreq: 'monthly' },
  { url: '/servicos/servicos-topograficos-profissionais-maputo-mocambique', priority: '0.7', changefreq: 'monthly' },
  { url: '/servicos/ensaios-fotograficos-profissionais-sem-studio-mocambique', priority: '0.7', changefreq: 'monthly' },
  { url: '/pagina-de-contato-lg-tecserv-mocambique', priority: '0.7', changefreq: 'monthly' },
  { url: '/termos-e-condicoes-lg-tecserv', priority: '0.3', changefreq: 'yearly' },
  { url: '/faq', priority: '0.5', changefreq: 'monthly' },
  { url: '/loja', priority: '0.9', changefreq: 'daily' },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const today = new Date().toISOString().split('T')[0];

  // Fetch all products from Supabase
  let products: Product[] = [];
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,slug,updated_at,image_url,categories(slug),product_images(image_url,is_primary)&order=created_at.desc`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    products = await response.json();
  } catch (err) {
    console.error('Error fetching products for sitemap:', err);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n`;

  // Static pages
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Dynamic product pages
  if (Array.isArray(products)) {
    for (const product of products) {
      const catSlug = product.categories?.slug;
      const urlPath = catSlug ? `/loja/${catSlug}/${product.slug}` : `/produto/${product.slug}`;
      const lastmod = product.updated_at ? product.updated_at.split('T')[0] : today;

      // Find the main image
      let mainImage = product.image_url ||
        product.product_images?.find(img => img.is_primary)?.image_url ||
        product.product_images?.[0]?.image_url;

      const cleanName = stripEmojis(product.name);

      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${urlPath}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;

      if (mainImage) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(mainImage)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(cleanName)} - Comprar em Moçambique</image:title>\n`;
        xml += `    </image:image>\n`;
      }

      xml += `  </url>\n`;
    }

    // Extract unique categories from products and add them to sitemap
    const uniqueCategories = new Set<string>();
    for (const product of products) {
      if (product.categories?.slug) {
        uniqueCategories.add(product.categories.slug);
      }
    }

    for (const catSlug of uniqueCategories) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/loja/${catSlug}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(xml);
}
