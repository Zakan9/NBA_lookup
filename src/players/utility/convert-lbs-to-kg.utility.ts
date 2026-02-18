export function convertLbsToKg(weight: string): number | null {
  const parsed = parseInt(weight, 10);
  if (!Number.isNaN(parsed)) {
    return Math.round(parsed * 0.45);
  } else {
    return null;
  }
}
