export function getImage(imagePath: string) {
  return new URL(imagePath, import.meta.url).href;
}
