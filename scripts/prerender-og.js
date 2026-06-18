import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const BASE_URL = 'https://www.lgtecserv.com';
const DEFAULT_IMAGE = `${BASE_URL}/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.webp`;
const DEFAULT_DESC = 'Oferecemos soluções completas em criação de sites, design gráfico, tráfego pago e marketing digital para fazer seu negócio crescer.';

const staticPages = [
    { url: '/vagas-de-emprego', title: 'Vagas de Emprego - LG TecServ Moçambique', img: '/lovable-uploads/banner-vagas.webp', desc: 'Junte-se à equipa da LG TecServ Moçambique. Veja as nossas vagas abertas e envie o seu currículo!' },
    { url: '/loja', title: 'Loja Online - LG TecServ Moçambique', img: '/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.webp', desc: 'Compre produtos e equipamentos de alta tecnologia na Loja Online da LG TecServ.' },
    { url: '/sobre-nos-lg-tecserv-mocambique', title: 'Sobre Nós - LG TecServ', desc: 'Conheça a história e os valores da LG TecServ Moçambique.' },
    { url: '/servicos/criacao-desenvolvimento-sites-profissionais-mocambique', title: 'Criação de Sites Profissionais Moçambique', img: '/lovable-uploads/criacao-sites-banner.webp', desc: 'Desenvolvemos sites rápidos, modernos e otimizados para vendas e conversões.' },
    { url: '/servicos/design-grafico-profissional-mocambique', title: 'Design Gráfico Profissional Moçambique', img: '/lovable-uploads/design-grafico-banner.webp', desc: 'Logótipos, banners e identidade visual profissional para a sua marca.' },
    { url: '/servicos/gestao-trafego-pago-marketing-digital-mocambique', title: 'Gestão Tráfego Pago Marketing Digital', img: '/lovable-uploads/consultoria-marketing-banner.webp', desc: 'Aumente as suas vendas com anúncios no Google, Facebook e Instagram.' },
    { url: '/servicos/seguranca-eletronica-mocambique', title: 'Segurança Eletrónica Moçambique', img: '/lovable-uploads/Baner principal seguranca eletronica.webp', desc: 'Instalação e manutenção de Câmaras de Segurança, Cercas Elétricas e Controle de Acessos.' },
    { url: '/documentacao-oficial-lg-tecserv', title: 'Documentação Oficial - Termos e Políticas | LG TecServ', img: '/lovable-uploads/lg-tecserv-logo-oficial.webp', desc: 'Termos e Condições Gerais de Prestação de Serviços, Políticas de Reembolso, Garantias e Manutenção da LG TecServ Moçambique.' }
];

function escapeHtml(unsafe) {
    if(!unsafe) return '';
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
    if(!text) return '';
    return text.replace(/[\u{1F600}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u200D]|[\u{20E3}]|[\u{E0020}-\u{E007F}]|[\u2728\u{1F525}\u{1F4E6}\u{1F4F1}\u26A1\uFE0F\u00AE\u2122]/gu, '').replace(/\s+/g, ' ').trim();
}

function injectSEO(baseHtml, { title, description, image, url }) {
    let html = baseHtml;
    
    const safeTitle = escapeHtml(title);
    const safeDesc = escapeHtml(description || DEFAULT_DESC);
    const safeUrl = escapeHtml(url);
    const safeImg = escapeHtml(image?.startsWith('http') ? image : `${BASE_URL}${image || DEFAULT_IMAGE}`);

    // Replace <title>
    html = html.replace(/<title>.*?<\/title>/s, `<title>${safeTitle}</title>`);
    
    // Replace description
    html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/s, `<meta name="description" content="${safeDesc}" />`);
    
    // Replace OG tags
    html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/s, `<meta property="og:title" content="${safeTitle}" />`);
    html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/>/s, `<meta property="og:description" content="${safeDesc}" />`);
    html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/>/s, `<meta property="og:image" content="${safeImg}" />`);
    html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/s, `<meta property="og:url" content="${safeUrl}" />`);
    
    // Replace Twitter tags
    html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/s, `<meta name="twitter:title" content="${safeTitle}" />`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/s, `<meta name="twitter:description" content="${safeDesc}" />`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/s, `<meta name="twitter:image" content="${safeImg}" />`);
    
    return html;
}

async function runPrerender() {
    console.log('🚀 A iniciar o Prerender das tags Open Graph...');
    
    const distPath = path.resolve(__dirname, '../dist');
    const indexPath = path.join(distPath, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        console.error('❌ ERRO: Ficheiro dist/index.html não encontrado! Executaste o npm run build?');
        process.exit(1);
    }
    
    const baseHtml = fs.readFileSync(indexPath, 'utf8');

    // 1. Renderizar páginas estáticas importantes
    for (const page of staticPages) {
        const fullUrl = `${BASE_URL}${page.url}`;
        const newHtml = injectSEO(baseHtml, {
            title: page.title,
            description: page.desc,
            image: page.img,
            url: fullUrl
        });
        
        // Criar diretório e escrever o index.html clone
        const targetDir = path.join(distPath, page.url.substring(1)); // remove leading slash
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, 'index.html'), newHtml, 'utf8');
        console.log(`✅ Prerendered genérico: ${page.url}`);
    }

    // 2. Fetch de Produtos do Supabase para renderizar dinamicamente
    if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        try {
            const { data: allProducts, error } = await supabase
                .from('products')
                .select('id, name, slug, description, categories(slug), product_images(image_url, is_primary)');

            if (error) {
                console.warn(`⚠️ Aviso: Erro ao obter produtos do Supabase (${error.message})`);
            } else if (allProducts && allProducts.length > 0) {
                for (const product of allProducts) {
                    const catSlug = product.categories?.slug;
                    const urlPath = catSlug ? `/loja/${catSlug}/${product.slug}` : `/produto/${product.slug}`;
                    const fullUrl = `${BASE_URL}${urlPath}`;

                    // Tentar descobrir a imagem principal
                    let mainImage = product.product_images?.find(img => img.is_primary)?.image_url;
                    if (!mainImage && product.product_images?.length > 0) {
                        mainImage = product.product_images[0].image_url;
                    }

                    const safeDesc = (product.description || '').replace(/(<([^>]+)>)/gi, "").substring(0, 160) + '...';

                    const newHtml = injectSEO(baseHtml, {
                        title: `${stripEmojis(product.name)} - LG TecServ`,
                        description: safeDesc,
                        image: mainImage || DEFAULT_IMAGE,
                        url: fullUrl
                    });
                    
                    const targetDir = path.join(distPath, urlPath.substring(1));
                    fs.mkdirSync(targetDir, { recursive: true });
                    fs.writeFileSync(path.join(targetDir, 'index.html'), newHtml, 'utf8');
                    console.log(`✅ Prerendered produto: ${urlPath}`);
                }
            }
        } catch (e) {
            console.warn(`⚠️ Aviso: Falha na ligação ao Supabase, a ignorar produtos.`, e.message);
        }
    }

    console.log('🎉 Prerender das tags Open Graph concluído com sucesso!');
}

runPrerender();
