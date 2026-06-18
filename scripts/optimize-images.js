import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/lovable-uploads');

async function optimizeImages() {
  console.log(`🔍 À procura de imagens em ${targetDir}`);
  
  if (!fs.existsSync(targetDir)) {
    console.error('❌ Diretório não encontrado.');
    return;
  }

  const files = fs.readdirSync(targetDir);
  const images = files.filter(file => 
    file.toLowerCase().endsWith('.png') || 
    file.toLowerCase().endsWith('.jpg') || 
    file.toLowerCase().endsWith('.jpeg')
  );

  console.log(`📸 Encontradas ${images.length} imagens para otimizar.`);

  let totalSaved = 0;

  for (const file of images) {
    const filePath = path.join(targetDir, file);
    const fileNameWithoutExt = path.parse(file).name;
    const newFileName = `${fileNameWithoutExt}.webp`;
    const newFilePath = path.join(targetDir, newFileName);

    // Evitar converter se já existe a versão webp para poupar tempo
    if (fs.existsSync(newFilePath)) {
      console.log(`⏩ Já existe ${newFileName}, a ignorar...`);
      continue;
    }

    try {
      const originalStats = fs.statSync(filePath);
      
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(newFilePath);
        
      const newStats = fs.statSync(newFilePath);
      const savedBytes = originalStats.size - newStats.size;
      const savedMB = (savedBytes / 1024 / 1024).toFixed(2);
      
      totalSaved += savedBytes;

      console.log(`✅ Convertido: ${file} -> ${newFileName} | Poupou: ${savedMB} MB`);
      
      // Opcional: Apagar o original
      // fs.unlinkSync(filePath);
    } catch (err) {
      console.error(`❌ Erro ao converter ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Processo concluído! Total de espaço poupado: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
