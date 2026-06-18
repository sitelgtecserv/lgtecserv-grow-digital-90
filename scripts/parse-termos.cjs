const fs = require('fs');

const md = fs.readFileSync('public/termos.md', 'utf-8');
const lines = md.split('\n');

const termos = [];
let currentTerm = null;

for (let line of lines) {
  // Check if line is a heading: e.g. "__1\.OBJETO DOS SERVIÇOS__"
  const headingMatch = line.match(/^__(\d+)\\\.?\s*(.*?)__/);
  if (headingMatch) {
    if (currentTerm) {
      currentTerm.content = currentTerm.content.trim();
      termos.push(currentTerm);
    }
    currentTerm = {
      id: headingMatch[1],
      title: headingMatch[2].trim(),
      content: ''
    };
  } else if (currentTerm) {
    // Remove bold markers for subheadings or normal text if needed, or keep them as markdown
    if (line.trim() !== '') {
      currentTerm.content += line + '\n';
    }
  }
}

if (currentTerm) {
  currentTerm.content = currentTerm.content.trim();
  termos.push(currentTerm);
}

const tsContent = `export interface Termo {
  id: string;
  title: string;
  content: string;
}

export const termosCondicoes: Termo[] = ${JSON.stringify(termos, null, 2)};
`;

fs.writeFileSync('src/data/termosCondicoes.ts', tsContent);
console.log(`termosCondicoes.ts generated successfully with ${termos.length} items!`);
