export function convertLbsToKg(weight: string | number): number | null {
  if (typeof weight === 'string') {
    const parsed = parseInt(weight, 10);
    if (!Number.isNaN(parsed)) {
      return Math.round(parsed * 0.45);
    }
    return null;
  } else if (typeof weight === 'number') {
    return Math.round(weight * 0.45);
  }
  return null;
}
