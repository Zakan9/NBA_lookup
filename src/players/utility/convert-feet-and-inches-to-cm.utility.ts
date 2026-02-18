export function convertFeetAndInchesToCm(height: string): number | null {
  const parts = height.split('-');
  if (!Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
    return Math.round(parseInt(parts[0]) * 30.48 + parseInt(parts[1]) * 2.54);
  }
  return null;
}
