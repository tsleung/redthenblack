// carwash

// cost of rent
// cost of mortgage, principal + interest
// fixed expenses (hoa / property taxes / etc) 
// 
// how much do you expect to save on taxes each year*
// what happens with inflation

// how much do you pay monthly over 30 years, then sell it, fair value
export function rentVsBuy() {

  // create interface for value * timespace, this can be a constructor e.g.
  // createMonthlyCashflow(2500) which can be converted to annual/daily

  // create itnerface for rent params
   const rentCost = rent(3600*12);
   // create interface for buy params
   const buyCost = buy(1e6, 3e3 * 12, 2.5e3 * 12, 2e5, 30);
   console.log('rent', rentCost);
   console.log('buys', buyCost);
}

export function rent(
  annualPayment,
  rentalIncrease = [1.02, 1.05],
  numberOfYears = 30,
) {

  return -1 * annualPayment * numberOfYears;
}

export function buy(
  nav,
  fixedAnnualPayment,
  mortgageAnnualPayment,
  downPayment,
  numberOfYears,
) {

  const fixedExpenses = (fixedAnnualPayment + mortgageAnnualPayment) * numberOfYears + downPayment;
  const mortgageAcquiredValue = nav;

  return mortgageAcquiredValue - fixedExpenses;
}

