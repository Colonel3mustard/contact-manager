export function getImage(imagePath: string) {
  return new URL(imagePath, import.meta.url).href;
}

// unused, just a place to list the colors I was commonly using
export const colors = [
  { name: 'cardinal', value: '#de3c4b' },
  { name: 'blue', value: '#258EA6' },
  { name: 'green', value: '#1A936F' },
  { name: 'orange', value: '#EF8354' },
];
