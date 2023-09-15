/**
 * Simulate investment across only the first working year until retirement
 * 
 * @param monthlyReturns 
 * @param numYears 
 * @param annualInvestment 
 * @returns 
 */
export function firstYearDifference(monthlyReturns: number[], numYears: number, annualInvestment: number) {
  return investPerYear(
    generateMonthlyPeriods(monthlyReturns, numYears),
    simulateFrontload,
    simulateDca,
  );

  function simulateFrontload(monthlyPeriods: number[]) {
    return [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
      const balance = pastBalances.at(-1) * monthlyReturn;
      // check if its the beginning of the year
      return i % 12 === 0 && i < 12 ? 
        // add frontload
        [...pastBalances, balance + annualInvestment] :
        // Otherwise add nothing
        [...pastBalances, balance];
    }, [0]);
  }

  function simulateDca(monthlyPeriods: number[]) {
    return [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
      const balance = pastBalances.at(-1) * monthlyReturn;
      return i < 12 ? 
        // DCA the first year
        [...pastBalances, balance + (annualInvestment / 12)] :
        // Past first year
        [...pastBalances, balance];
    }, [0]);
  } 
}

/**
 * Simulate investment across all working years until retirement
 * 
 * @param monthlyReturns 
 * @param numYears 
 * @param annualInvestment 
 * @returns 
 */
export function allYearsDifference(monthlyReturns: number[], numYears: number, annualInvestment: number) {
  return investPerYear(
    generateMonthlyPeriods(monthlyReturns, numYears),
    simulateFrontload,
    simulateDca,
  );

  function simulateFrontload(monthlyPeriods: number[]) {
    return [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
      const balance = pastBalances.at(-1) * monthlyReturn;
      // check if its the beginning of the year
      return i % 12 === 0 ? 
        // add frontload
        [...pastBalances, balance + annualInvestment] :
        // Otherwise add nothing
        [...pastBalances, balance];
    }, [0]);
  }

  function simulateDca(monthlyPeriods: number[]) {
    return [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
      const balance = pastBalances.at(-1) * monthlyReturn;
      // DCA all years
      return [...pastBalances, balance + (annualInvestment / 12)];
    }, [0]);    
  }
}

/**
 * Variation with simulated investment across all working years until retirement
 * 
 * @param monthlyReturns 
 * @param numYears 
 * @param annualInvestment 
 * @returns 
 */
export function allYearsSamplingDifference(monthlyReturns: number[], numYears: number, annualInvestment: number) {
  console.log('running again');
  return investPerYear(
    generateMonthlyPeriodsBySampling(monthlyReturns, numYears),
    simulateFrontload,
    simulateDca,
  );

  function simulateFrontload(monthlyPeriods: number[]) {
    return [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
      const balance = pastBalances.at(-1) * monthlyReturn;
      // check if its the beginning of the year
      return i % 12 === 0 ? 
        // add frontload
        [...pastBalances, balance + annualInvestment] :
        // Otherwise add nothing
        [...pastBalances, balance];
    }, [0]);
  }

  function simulateDca(monthlyPeriods: number[]) {
    return [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
      const balance = pastBalances.at(-1) * monthlyReturn;
      // DCA all years
      return [...pastBalances, balance + (annualInvestment / 12)];
    }, [0]);    
  }
}

function investPerYear(
  monthlyPeriods: number[], 
  simulateFrontload: (monthlyPeriods: number[]) => number[],
  simulateDca: (monthlyPeriods: number[]) => number[],
  ) {

  const frontload = simulateFrontload(monthlyPeriods);
  const dca = simulateDca(monthlyPeriods);

  // zip arrays and diff
  const difference = frontload.map((v,i) => {
    return frontload[i] - dca[i];
  });

  return {
    frontload,
    dca,
    difference
  };
}

/**
 * Sampling from the monthly periods to create variation across all years
 * 
 * @param monthlyReturns 
 * @param numYears 
 * @returns 
 */
function generateMonthlyPeriodsBySampling(
  monthlyReturns: number[], 
  numYears: number, 
  ):number[] {
  if(monthlyReturns.length != 12) {
    throw new Error(`Monthly returns needs to be have 12 values ${JSON.stringify(monthlyReturns)}`);
  }
  
  const numMonths = numYears * 12;
  // create standard monthly periods to compare evenly, right now not sampling
  const monthlyPeriods = new Array(numMonths).fill(0).map((v,i) => {
    // random generator
    const monthIndex = Math.floor(Math.random() * 12); 
    return monthlyReturns[monthIndex];
  });
  console.log('all monthly periods', monthlyPeriods);
  
  return monthlyPeriods;
}

/**
 * Generating more years from the same deterministic monthly periods
 * @param monthlyReturns 
 * @param numYears 
 * @returns 
 */
function generateMonthlyPeriods(
  monthlyReturns: number[], 
  numYears: number, 
  ):number[] {
  if(monthlyReturns.length != 12) {
    throw new Error(`Monthly returns needs to be have 12 values ${JSON.stringify(monthlyReturns)}`);
  }
  
  const numMonths = numYears * 12;
  // create standard monthly periods to compare evenly, right now not sampling
  const monthlyPeriods = new Array(numMonths).fill(0).map((v,i) => {
    // deterministic sequence of 0,1,2,3,4,5,6,7,8,9,10,11
    const monthIndex = i % 12;
    return monthlyReturns[monthIndex];
  });
  console.log('all monthly periods', monthlyPeriods);
  
  return monthlyPeriods;
}