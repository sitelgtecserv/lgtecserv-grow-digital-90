const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');
const indexHtmlPath = path.join(distPath, 'index.html');

// Read the original index.html
if (!fs.existsSync(indexHtmlPath)) {
  console.error("Erro: dist/index.html não encontrado. Por favor, corre o comando de build primeiro.");
  process.exit(1);
}

const originalHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// Define routes and their specific SEO metadata
const routes = [
  {
    path: 'documentacao-oficial-lg-tecserv',
    title: 'Documentação Oficial | LG TecServ - Políticas, Regras e Processos',
    description: 'Conheça todas as políticas oficiais da LG TecServ: missão, regras de atendimento, pagamentos, criação de sites, direitos e privacidade.',
    image: 'https://www.lgtecserv.com/lovable-uploads/lg-tecserv-logo-oficial.webp' // Using the official logo for documentation
  }
  // Add other routes here if needed in the future
];

function replaceMeta(html, route) {
  let newHtml = html;
  
  // Replace Title
  newHtml = newHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  
  // Replace Meta Description
  newHtml = newHtml.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${route.description}" />`);
  
  // Replace OG Tags
  newHtml = newHtml.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${route.title}" />`);
  newHtml = newHtml.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${route.description}" />`);
  newHtml = newHtml.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${route.image}" />`);
  
  // Replace Twitter Tags
  newHtml = newHtml.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${route.title}" />`);
  newHtml = newHtml.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${route.description}" />`);
  newHtml = newHtml.replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${route.image}" />`);
  
  return newHtml;
}

routes.forEach(route => {
  const routeDir = path.join(distPath, route.path);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  // Replace metadata
  const modifiedHtml = replaceMeta(originalHtml, route);
  
  // Write the new index.html
  const outPath = path.join(routeDir, 'index.html');
  fs.writeFileSync(outPath, modifiedHtml);
  
  console.log(`Página SEO gerada para /${route.path}`);
});

console.log("Geração de páginas estáticas para SEO concluída.");
