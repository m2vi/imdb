export function removeQueryParams(url: string) {
  return url.split('?')?.[0] || url;
}
