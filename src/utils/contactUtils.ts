export function getImage(imagePath: string) {
  return new URL(imagePath, import.meta.url).href;
}

export const colors = [
  { name: 'cardinal', value: '#de3c4b' },
  { name: 'blue', value: '#258EA6' },
  { name: 'green', value: '#1A936F' },
  { name: 'orange', value: '#EF8354' },
];
