
/**
 * 
 * @param i interest rate, annual / 12 if monthly payments
 * @param n number of payments, annual * 12 if monthly
 */
export function calculateAmortizationPayment (i, n, loan) {
  const top = i * Math.pow((1+i), n);
  const bottom = Math.pow((1+i), n) - 1;

  return loan * top / bottom;
}