import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../src');

function findAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We only want to replace image extensions for lovable-uploads
      // e.g. "/lovable-uploads/image.png" -> "/lovable-uploads/image.webp"
      const regex = /(\/lovable-uploads\/[^"'\s]+)\.(png|jpg|jpeg)/gi;
      
      let changed = false;
      const newContent = content.replace(regex, (match, p1, p2) => {
        changed = true;
        return `${p1}.webp`;
      });
      
      if (changed) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`✅ Atualizado: ${fullPath}`);
      }
    }
  }
}

findAndReplace(srcDir);

// Also do it for sitemap generator
const sitemapScript = path.resolve(__dirname, 'generate-sitemap.js');
if (fs.existsSync(sitemapScript)) {
    let content = fs.readFileSync(sitemapScript, 'utf8');
    const regex = /(\/lovable-uploads\/[^"'\s]+)\.(png|jpg|jpeg)/gi;
    let changed = false;
    const newContent = content.replace(regex, (match, p1, p2) => {
        changed = true;
        return `${p1}.webp`;
    });
    if (changed) {
        fs.writeFileSync(sitemapScript, newContent, 'utf8');
        console.log(`✅ Atualizado: ${sitemapScript}`);
    }
}

console.log('🎉 Substituição de extensões concluída em src e scripts.');
