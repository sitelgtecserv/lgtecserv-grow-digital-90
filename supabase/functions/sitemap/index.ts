import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
}

interface Product {
  slug: string;
  updated_at: string;
  image_url: string | null;
  name: string;
}

interface Category {
  slug: string;
  updated_at: string;
  name: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Buscar todos os produtos ativos
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('slug, updated_at, image_url, name')
      .order('updated_at', { ascending: false })

    if (productsError) throw productsError

    // Buscar todas as categorias
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('slug, updated_at, name')
      .order('updated_at', { ascending: false })

    if (categoriesError) throw categoriesError

    const baseUrl = 'https://www.lgtecserv.com'

    // Gerar XML do sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Página Principal -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Loja -->
  <url>
    <loc>${baseUrl}/loja</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Páginas de Serviços -->
  <url>
    <loc>${baseUrl}/servicos-lg-tecserv-mocambique</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Categorias -->`

    categories?.forEach((category: Category) => {
      if (category.slug) {
        const lastmod = category.updated_at 
          ? new Date(category.updated_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
        
        xml += `
  <url>
    <loc>${baseUrl}/loja/${category.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      }
    })

    xml += `

  <!-- Produtos -->`

    products?.forEach((product: Product) => {
      if (product.slug) {
        const lastmod = product.updated_at 
          ? new Date(product.updated_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
        
        xml += `
  <url>
    <loc>${baseUrl}/produto/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>`
        
        if (product.image_url) {
          xml += `
    <image:image>
      <image:loc>${product.image_url}</image:loc>
      <image:title>${escapeXml(product.name)}</image:title>
    </image:image>`
        }
        
        xml += `
  </url>`
      }
    })

    xml += `
</urlset>`

    return new Response(xml, {
      headers: corsHeaders,
      status: 200,
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
