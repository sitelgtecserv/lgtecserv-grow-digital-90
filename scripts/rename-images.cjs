const fs = require('fs');
const path = require('path');

const imageMap = {
    'b1a5e62a-0fc0-447c-8210-6fed000d0b62': 'lg-tecserv-logo-oficial',
    '7c383221-e93f-4908-a3ab-03f2194a4b5b': 'lg-tecserv-logo-secundario',
    'cf635400-84f4-488e-9657-e75e01a40cb9': 'lg-tecserv-logo-seo',
    '325d2c5b-6f59-4ea5-9d92-9f389ced5bf8': 'negocios-banner-promocional',
    '28debcb6-ac82-49e3-a295-1e7d48776737': 'banner-hero-marketing',
    '360c27c7-e400-44e2-8dc0-059c833a6322': 'banner-hero-tecnologia',
    '2e1040f3-64d4-4448-9285-beddd362435d': 'banner-hero-inovacao',
    '66f9605c-90e0-4c1d-8691-d378145507c4': 'equipe-membro-1',
    'fe69f3f8-90ce-42e0-bb62-d81679a9ba6c': 'equipe-membro-2',
    '13b16b00-a0c3-4b06-97f3-2a00840fba17': 'servico-criacao-sites',
    '6ebe3952-c9f6-4acb-9671-26f3d73b4d89': 'servico-design-grafico',
    '97dafdc2-4228-47b1-b714-a1bac6741704': 'servico-trafego-pago',
    '956f6140-f148-4d7b-8b9e-46e4e63a8bf2': 'servico-gestao-redes-sociais',
    '8aa64f23-1d05-4062-baf8-1ebc04598ee1': 'servico-consultoria-marketing'
};

const publicDir = path.join(__dirname, '../public/lovable-uploads');
const srcDir = path.join(__dirname, '../src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

// 1. Rename files in public/lovable-uploads
console.log('Renomeando ficheiros físicos...');
for (const [uuid, newName] of Object.entries(imageMap)) {
    const oldFilePath = path.join(publicDir, `${uuid}.webp`);
    const newFilePath = path.join(publicDir, `${newName}.webp`);
    
    if (fs.existsSync(oldFilePath)) {
        fs.renameSync(oldFilePath, newFilePath);
        console.log(`✅ Renomeado: ${uuid}.webp -> ${newName}.webp`);
    } else {
        console.log(`⚠️ Não encontrado (já renomeado?): ${uuid}.webp`);
    }
}

// 2. Search and replace in code
console.log('\nAtualizando código-fonte...');
const files = walk(srcDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    for (const [uuid, newName] of Object.entries(imageMap)) {
        if (content.includes(uuid)) {
            content = content.replace(new RegExp(uuid, 'g'), newName);
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ Atualizado referências no ficheiro: ${path.relative(srcDir, file)}`);
    }
});

// 3. Optional: Delete unmapped UUID images (duplicates)
console.log('\nRemovendo imagens duplicadas ou não usadas (limpeza de UUIDs)...');
const allImages = fs.readdirSync(publicDir);
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\./i;

let deletedCount = 0;
allImages.forEach(img => {
    if (uuidRegex.test(img)) {
        const fullPath = path.join(publicDir, img);
        fs.unlinkSync(fullPath);
        console.log(`🗑️ Apagado: ${img}`);
        deletedCount++;
    }
});

console.log(`\n🎉 Processo concluído com sucesso! ${deletedCount} imagens lixo removidas.`);
