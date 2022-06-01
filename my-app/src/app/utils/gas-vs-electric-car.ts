
// how many miles 
function gas() {
  return car(20000, 5, 80000)
}
function electric() {}

function car(fixedCost,costPerMile, numberOfMiles) {
  return fixedCost + (costPerMile * numberOfMiles);
}


export function gasOrElectric() {
  const gasCarCost = 20000;
  const electricCarCost = 30000;

  const electricMileageCost = .034;
  const gallonGasCost = 6;
  const gasMpg = 30;
  const gasMileageCost = gallonGasCost / gasMpg;
  

  const vechicalCostDifference = electricCarCost - gasCarCost;
  const numMilesBreakeven = vechicalCostDifference /(gasMileageCost - electricMileageCost);

  console.log('num miles breakeven', numMilesBreakeven);
  return numMilesBreakeven;
}