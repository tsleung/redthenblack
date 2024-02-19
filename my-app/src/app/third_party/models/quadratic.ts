
/** Quadratic ax^2 + bx + c */
export function quadratic(
  exponentialFactor: number, 
  linearFactor: number,
  constant: number,
  x: number,
) {
  const percentage = (exponentialFactor * Math.pow(x, 2)) + 
    (linearFactor * x) + 
    constant;

  return Math.max(0, Math.min(1,percentage));
}