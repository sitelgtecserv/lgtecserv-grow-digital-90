import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente (VITE_SUPABASE_URL etc) do ficheiro .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERRO: Faltam as variáveis de ambiente VITE_SUPABASE_URL ou VITE_SUPABASE_PUBLISHABLE_KEY no fichero .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_URL = 'https://www.lgtecserv.com';

const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/sobre-nos-lg-tecserv-mocambique', priority: '0.8', changefreq: 'monthly' },
    { url: '/servicos-lg-tecserv-mocambique', priority: '0.9', changefreq: 'weekly' },
    { url: '/servicos/criacao-desenvolvimento-sites-profissionais-mocambique', priority: '0.8', changefreq: 'monthly', img: '/lovable-uploads/criacao-sites-banner.webp', title: 'Criação de Sites Profissionais Moçambique' },
    { url: '/servicos/design-grafico-profissional-mocambique', priority: '0.8', changefreq: 'monthly', img: '/lovable-uploads/design-grafico-banner.webp', title: 'Design Gráfico Profissional Moçambique' },
    { url: '/servicos/gestao-trafego-pago-marketing-digital-mocambique', priority: '0.8', changefreq: 'monthly', img: '/lovable-uploads/consultoria-marketing-banner.webp', title: 'Gestão Tráfego Pago Marketing Digital Moçambique' },
    { url: '/servicos/gestao-redes-sociais-marketing-digital-mocambique', priority: '0.8', changefreq: 'monthly', img: '/lovable-uploads/consultoria-marketing-banner.webp', title: 'Gestão Redes Sociais Marketing Digital Moçambique' },
    { url: '/servicos/consultoria-marketing-digital-estrategico-mocambique', priority: '0.8', changefreq: 'monthly', img: '/lovable-uploads/consultoria-marketing-banner.webp', title: 'Consultoria Marketing Digital Estratégico Moçambique' },
    { url: '/servicos/instalacoes-eletricas-profissionais-mocambique', priority: '0.8', changefreq: 'monthly', img: '/lovable-uploads/instalacoes-eletricas-banner.webp', title: 'Instalações Elétricas Profissionais Moçambique' },
    { url: '/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique', priority: '0.7', changefreq: 'monthly' },
    { url: '/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique', priority: '0.7', changefreq: 'monthly' },
    { url: '/servicos/seguranca-eletronica-mocambique', priority: '0.8', changefreq: 'monthly', img: '/lovable-uploads/Baner principal seguranca eletronica.webp', title: 'Segurança Eletrónica Moçambique' },
    { url: '/pagina-de-contato-lg-tecserv-mocambique', priority: '0.7', changefreq: 'monthly' },
    { url: '/termos-e-condicoes-lg-tecserv', priority: '0.3', changefreq: 'yearly' },
    { url: '/sitemap', priority: '0.4', changefreq: 'monthly' },
    { url: '/loja', priority: '0.9', changefreq: 'daily', img: '/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.webp', title: 'Loja Online - LG TecServ Moçambique' }
];

const targetCities = [
    'maputo',
    'matola',
    'beira',
    'nampula',
    'quelimane',
    'tete'
];

const targetServices = [
    { slug: 'criacao-de-sites', title: 'Criação de Sites' },
    { slug: 'design-grafico', title: 'Design Gráfico' },
    { slug: 'trafego-pago', title: 'Tráfego Pago' },
    { slug: 'gestao-de-redes-sociais', title: 'Gestão de Redes Sociais' },
    { slug: 'consultoria-de-marketing', title: 'Consultoria de Marketing' },
    { slug: 'instalacoes-eletricas', title: 'Instalações Elétricas' },
    { slug: 'topografia', title: 'Topografia' },
    { slug: 'ensaios-fotograficos', title: 'Ensaios Fotográficos' },
    { slug: 'construcao-civil', title: 'Construção Civil' },
    { slug: 'seguranca-eletronica', title: 'Segurança Eletrónica' }
];

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

function stripEmojis(text) {
    return text.replace(/[\u{1F600}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u200D]|[\u{20E3}]|[\u{E0020}-\u{E007F}]|[\u2728\u{1F525}\u{1F4E6}\u{1F4F1}\u26A1\uFE0F\u00AE\u2122]/gu, '').replace(/\s+/g, ' ').trim();
}

function createUrlNode(page) {
    let xml = `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq || 'weekly'}</changefreq>\n`;
    xml += `    <priority>${page.priority || '0.5'}</priority>\n`;

    if (page.img) {
        const imgUrl = page.img.startsWith('http') ? escapeXml(page.img) : `${BASE_URL}${escapeXml(page.img)}`;
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${imgUrl}</image:loc>\n`;
        if (page.title) {
            xml += `      <image:title>${escapeXml(page.title)}</image:title>\n`;
        }
        xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
    return xml;
}

async function generateSitemap() {
    console.log('\ud83d\udd04 A obter produtos da base de dados Supabase...');

    let allProducts = [];
    try {
        try {
        const { data, error } = await supabase
            .from('products')
            .select('id, name, slug, updated_at, categories(slug), product_images(image_url, is_primary)');

        if (error) {
            console.warn(`⚠️ Aviso: Erro ao obter produtos do Supabase, ignorando... (${error.message})`);
        } else {
            allProducts = data || [];
            console.log(`✅ Foram encontrados ${allProducts.length} produtos!`);
        }
    } catch (e) {
        console.warn(`⚠️ Aviso: Falha na ligação ao Supabase, a ignorar produtos da loja.`, e.message);
    }

        let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xmlContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
        xmlContent += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n`;

        let urlList = [];

        // 1. Pages estáticas
        for (const page of staticPages) {
            xmlContent += createUrlNode(page);
            urlList.push(`${BASE_URL}${page.url}`);
        }

        // 1.5. Local SEO Dinâmico (Serviços X Cidades)
        console.log(`\ud83d\udccd A gerar páginas de SEO Local...`);
        for (const service of targetServices) {
            for (const city of targetCities) {
                const urlPath = `/servicos/${service.slug}/local/${city}`;
                const cityName = city.charAt(0).toUpperCase() + city.slice(1);
                const pageData = {
                    url: urlPath,
                    priority: '0.7',
                    changefreq: 'monthly',
                    title: `${service.title} em ${cityName} - Especialistas`
                };
                xmlContent += createUrlNode(pageData);
                urlList.push(`${BASE_URL}${urlPath}`);
            }
        }

        // 2. Produtos Dinâmicos
        if (allProducts && allProducts.length > 0) {
            for (const product of allProducts) {
                const catSlug = product.categories?.slug;
                const urlPath = catSlug ? `/loja/${catSlug}/${product.slug}` : `/produto/${product.slug}`;

                // Tentar descobrir a imagem principal
                let mainImage = product.product_images?.find(img => img.is_primary)?.image_url;
                if (!mainImage && product.product_images?.length > 0) {
                    mainImage = product.product_images[0].image_url;
                }

                const pageData = {
                    url: urlPath,
                    priority: '0.8',
                    changefreq: 'weekly',
                    lastmod: product.updated_at ? product.updated_at.split('T')[0] : new Date().toISOString().split('T')[0],
                    img: mainImage,
                    title: `${stripEmojis(product.name)} - Comprar em Mo\u00e7ambique`
                };

                xmlContent += createUrlNode(pageData);
                urlList.push(`${BASE_URL}${urlPath}`);
            }
        }

        xmlContent += `</urlset>`;

        const destPath = path.resolve(__dirname, '../public/sitemap.xml');
        fs.writeFileSync(destPath, xmlContent, 'utf8');

        console.log(`✅ Sitemap.xml gerado com sucesso em: ${destPath}`);

        // == INTEGRAÇÃO INDEXNOW (BING / YANDEX) ==
        console.log(`🚀 A enviar ${urlList.length} URLs para o IndexNow (Bing)...`);
        const indexNowData = {
            host: "www.lgtecserv.com",
            key: "a7f9b8c2d1e44a6ea214972f3e8b5c90",
            keyLocation: "https://www.lgtecserv.com/a7f9b8c2d1e44a6ea214972f3e8b5c90.txt",
            urlList: urlList
        };

        try {
            const response = await fetch('https://api.indexnow.org/indexnow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(indexNowData)
            });

            if (response.ok || response.status === 200 || response.status === 202) {
                console.log('✅ Links enviados com sucesso para o Bing IndexNow (Indexação Instantânea).');
            } else {
                console.warn('⚠️ O IndexNow respondeu com o código:', response.status);
            }
        } catch (apiError) {
            console.error('❌ Falha ao contactar a API IndexNow:', apiError.message);
        }

    } catch (error) {
        console.error('❌ ERRO ao gerar Sitemap:', error.message);
        process.exit(1);
    }
}

generateSitemap();
