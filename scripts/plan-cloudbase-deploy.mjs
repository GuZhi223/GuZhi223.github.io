import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const planDir = path.join(root, '.deploy-plan');
const previousManifestPath = process.argv[2];
const forceFull = process.argv.includes('--force-full');
const maxIncrementalChanges = 25;
const manifestName = '.deploy-manifest.json';

function toPosix(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function isSafeRelativePath(relativePath) {
  return (
    typeof relativePath === 'string'
    && relativePath.length > 0
    && !relativePath.startsWith('/')
    && !relativePath.includes('\\')
    && !relativePath.split('/').includes('..')
  );
}

async function listFiles(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(prefix, entry.name);
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listFiles(absolutePath, relativePath));
    } else if (entry.isFile() && toPosix(relativePath) !== manifestName) {
      files.push(toPosix(relativePath));
    }
  }

  return files;
}

async function hashFile(relativePath) {
  const contents = await readFile(path.join(dist, ...relativePath.split('/')));
  return createHash('sha256').update(contents).digest('hex');
}

async function readPreviousManifest() {
  if (!previousManifestPath) return null;

  try {
    const parsed = JSON.parse(await readFile(previousManifestPath, 'utf8'));
    if (parsed.version !== 1 || typeof parsed.files !== 'object' || parsed.files === null) {
      return null;
    }

    for (const [relativePath, hash] of Object.entries(parsed.files)) {
      if (!isSafeRelativePath(relativePath) || typeof hash !== 'string') {
        throw new Error(`Unsafe or invalid manifest entry: ${relativePath}`);
      }
    }

    return parsed;
  } catch (error) {
    console.warn(`Previous deploy manifest is unavailable: ${error.message}`);
    return null;
  }
}

const filePaths = (await listFiles(dist)).sort();
const files = Object.fromEntries(
  await Promise.all(filePaths.map(async (relativePath) => [relativePath, await hashFile(relativePath)])),
);
const previousManifest = await readPreviousManifest();
const previousFiles = previousManifest?.files ?? {};

const changed = filePaths.filter((relativePath) => files[relativePath] !== previousFiles[relativePath]);
const deleted = Object.keys(previousFiles)
  .filter((relativePath) => !(relativePath in files))
  .sort();

const manifest = {
  version: 1,
  commit: process.env.GITHUB_SHA ?? null,
  files,
};
await writeFile(path.join(dist, manifestName), `${JSON.stringify(manifest)}\n`);

const totalChanges = changed.length + deleted.length;
const mode = forceFull || !previousManifest || totalChanges > maxIncrementalChanges
  ? 'full'
  : 'incremental';

if (mode === 'incremental') {
  changed.push(manifestName);
}

await mkdir(planDir, { recursive: true });
await writeFile(path.join(planDir, 'changed.txt'), changed.length ? `${changed.join('\n')}\n` : '');
await writeFile(path.join(planDir, 'deleted.txt'), deleted.length ? `${deleted.join('\n')}\n` : '');
await writeFile(
  path.join(planDir, 'plan.json'),
  `${JSON.stringify({
    mode,
    currentFiles: filePaths.length + 1,
    changedFiles: changed.length,
    deletedFiles: deleted.length,
    previousManifestFound: Boolean(previousManifest),
  }, null, 2)}\n`,
);

console.log(`CloudBase deploy plan: ${mode}`);
console.log(`Current: ${filePaths.length + 1}, changed: ${changed.length}, deleted: ${deleted.length}`);
