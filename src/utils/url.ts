export function withBaseUrl(path: string) {
  if (!path.startsWith('/')) return path;

  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${path.slice(1)}`;
}
