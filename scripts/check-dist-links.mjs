import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const failures = [];

function requireExists(relativePath) {
  const target = path.join(dist, relativePath);
  if (!existsSync(target)) {
    failures.push(`缺少 ${relativePath}`);
  }
}

function toDistTarget(url) {
  const clean = url.replace(/^\//, '');
  if (clean.endsWith('/')) return `${clean}index.html`;
  return clean;
}

requireExists('index.html');
requireExists('projects/particles/index.html');
requireExists('projects/trust/index.html');
requireExists('projects/perler-bead/index.html');
requireExists('projects/china-history-review/index.html');
requireExists('projects/data-structure-quiz/index.html');
requireExists('assignments/index.html');
requireExists('.nojekyll');

const sourceFiles = [
  path.join(root, 'src/data/works.ts'),
  path.join(root, 'src/data/projects.ts'),
];

for (const file of sourceFiles) {
  const source = readFileSync(file, 'utf8');
  const localHrefs = [...source.matchAll(/href:\s*'([^']+)'/g)]
    .map((match) => match[1])
    .filter((href) => href.startsWith('/'));
  const images = [...source.matchAll(/image:\s*'([^']+)'/g)].map((match) => match[1]);

  for (const href of localHrefs) {
    requireExists(toDistTarget(href));
  }

  for (const image of images) {
    requireExists(image.replace(/^\//, ''));
  }
}

const index = readFileSync(path.join(dist, 'index.html'), 'utf8');
const badPatterns = [/\/undefined/, /localhost/i, /127\.0\.0\.1/, /src\//];

for (const pattern of badPatterns) {
  if (pattern.test(index)) {
    failures.push(`dist/index.html 命中异常内容：${pattern}`);
  }
}

if (failures.length > 0) {
  console.error('dist 检查失败：');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('dist 检查通过。');
