import { cp, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const entries = [
  { from: 'projects', to: 'projects' },
  { from: 'assignments', to: 'assignments' },
  { from: '.nojekyll', to: '.nojekyll' },
];

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

await mkdir(dist, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry.from);
  const target = path.join(dist, entry.to);

  if (!(await exists(source))) {
    continue;
  }

  await rm(target, { recursive: true, force: true });
  await cp(source, target, {
    recursive: true,
    force: true,
    verbatimSymlinks: true,
  });
  console.log(`copied ${entry.from} -> dist/${entry.to}`);
}
