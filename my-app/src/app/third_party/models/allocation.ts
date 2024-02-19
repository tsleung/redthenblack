import { quadratic } from "./quadratic";

export function calculateFixedAllocation(percentage) {
  return percentage;
}

// ax2 + bx+ c = 0, where x is period and the result is the allocation, a and b are provided
export function calculatePolynomialAllocation(
  exponentialFactor, 
  linearFactor,
  constant,
  period) {
  const percentage = quadratic(
    exponentialFactor,
    linearFactor,
    constant,
    period,
  );

  return percentage;
}