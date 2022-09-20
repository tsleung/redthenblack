

/** Utility functions */

export function balanceToCashFlow(balances:number[], includeFirstBalance = true) {
  const initialBalance = includeFirstBalance ? 
    balances[0] ?? 0 :
    0;
  return balances.reduce((accum, val, i) => {
    const cashFlow = i === 0 ? 
      initialBalance : // first cash flow is initial investment
      val - balances[i-1] // normal cash flow determination
      
    accum.push(cashFlow);
    return accum;
  },[]);
}

export function lastValueOf<T>(val: T[]):T {
  return val[val.length - 1];
}
export function firstValueOf<T>(val: T[]):T {
  return val[0];
}

export function prettyRoundNumber(val: number) {
  const rounded = Math.round(val);
  return rounded.toLocaleString();
}

// sort by cash flow - back to original

/** Utility Functions below */

export function createRandomDataSeries(): c3.Primitive[] {
  return new Array(50).fill(0).map(() => Math.random()*200-100);
}

export function createSavingsSeries(numPeriods: number, amount: number):number[] {
  return [0,...new Array(numPeriods).fill(amount)];
}

export function createBondCashFlow(numPeriods: number, coupon:number,faceValue: number, price: number) {

const cashFlow = new Array(numPeriods+1).fill(coupon);
cashFlow[0] = -1*price;
cashFlow[cashFlow.length - 1] = cashFlow[cashFlow.length - 1] + faceValue;

return cashFlow;

}

export interface CashFlowAccount {
  cashFlow: number[];
  account: number[];
}
export function calculateOptimalBetSizing(numRedCards: number, numBlackCards: number, betSize: number, startingBalance = 1):CashFlowAccount {

  const redCards = new Array(numRedCards).fill('red');
  const blackCards = new Array(numBlackCards).fill('black');
  const unshuffledDeck = ([...blackCards,...redCards]);
  const shuffledDeck = shuffleDeck(unshuffledDeck);
  
  return shuffledDeck.reduce((accum, card) => {
    const previousBalance = accum.account[accum.account.length - 1];

    const absoluteCashFlow = previousBalance * betSize;
    const cashFlow = card === 'red' ?  absoluteCashFlow : -1 * absoluteCashFlow;
    
    accum.account.push(cashFlow + previousBalance);
    accum.cashFlow.push(cashFlow);

    return accum;

  }, {cashFlow:[startingBalance], account:[startingBalance]});


}

export function shuffleDeck(deck) {
  const shuffledDeck = [];
  while(deck.length > 0) {
    const index = Math.floor(Math.random() * deck.length);
    const card = deck.splice(index,1);
    shuffledDeck.push(card[0]);
  }
  return shuffledDeck;
}
// create functions which convert:
// (1) balances to cash flow
// (2) cash flows to balances

export function createNaiveStocksCashFlow(numPeriods: number, growthRate, startingBalance:number) {
  return new Array(numPeriods).fill(0).reduce((accum) => {
    accum.push(accum[accum.length - 1] * growthRate);
    return accum;
  },[startingBalance]);
}

export function createRetirementNestEggBalance(
  nestEgg:number,
  periodsInRetirement:number,
  withdrawalRate:number
) :number[]{
  const arr:number[] = new Array(periodsInRetirement).fill(withdrawalRate);
  
  return arr.reduce((accum, withdrawalRate) => {
    const previousBalance = lastValueOf(accum);
    const withdrawal = Math.round(withdrawalRate * previousBalance);
    const newBalance = previousBalance - withdrawal;
    return [...accum, newBalance];
  }, [nestEgg] as number[])
}

export function randomWalk(
  numberOfPeriods: number,
  goodEvenReturn: number,
  badEvenReturn: number,
  startingBalance: number,
):number[] {
  const numberOfEachCard = Math.floor(numberOfPeriods / 2);
  const positiveReturns = new Array(numberOfEachCard).fill(goodEvenReturn);
  const negativeReturns = new Array(numberOfEachCard).fill(badEvenReturn);

  const deck:number[] = shuffleDeck([...positiveReturns, ...negativeReturns]);

  const balance = deck.reduce((accum, val) => {
    const newBalance = lastValueOf(accum) * val;
    return [...accum, newBalance];
  }, [startingBalance]);

  return balance;

}

export function rebalanceRandomWalk(
  numberOfPeriods: number,
  goodEvenReturn: number,
  badEvenReturn: number,
  startingBalance: number,
  leverage: number,
):number[] {
  const numberOfEachCard = Math.floor(numberOfPeriods / 2);
  const positiveReturns = new Array(numberOfEachCard).fill(goodEvenReturn);
  const negativeReturns = new Array(numberOfEachCard).fill(badEvenReturn);

  const deck:number[] = shuffleDeck([...positiveReturns, ...negativeReturns]);

  const balance = deck.reduce((accum, val) => {
    const oldBalance = lastValueOf(accum);
    const cashAllocation = (1 - leverage) * oldBalance;
    const equityAllocation = leverage * (oldBalance) * val;
    const newBalance = cashAllocation + equityAllocation;

    return [...accum, newBalance];
  }, [startingBalance]);

  return balance;
}

// assumption, 1.1 every year, (1.25*.88)


  // nominal value of money, aside compounding, does matter. losing 50% today on 100k is a 50k lost, which is not trivial. however if you're looking to retire with 5M, a 50% lost is 2.5M. This is an almost unacceptable loss, and can completely eliminate a chance at a carefree retirement.

  // therefore leverage should become a function as to the proportion of your current balance vs a confident value of retirement. we'll assume 95% confidence in retirement and the idea of 60 years between the start of investment and end of required retirement benefits. 


  // exponential vs linear, chaos early in life and lower risk later
  // ax^2 + bx + c
  // balance decay factor
  // except the balance need you need to retire is constantly changing based on how much retirement you have

  // depending how much time you have left, changes the amount you need in retirement because the withdrawal rate and volatility

  // rather than think about retirement alone, think about a midpoint between when you feel comfortable to retire, and how long you should maintain working

export function timeDiversification(
  numberOfPeriods: number,
  goodReturn: number,
  badReturn: number,
  startingBalance: number,
  savingsPerPeriod: number,
  baseLeverage: number,
  desiredRetirement: number,
  quadraticDecayFactor: number,
  linearDecayFactor: number,
) {
  const deck:number[] = new Array(numberOfPeriods).fill(0).map((v,i) => i % 2 === 0 ? goodReturn : badReturn);

  const balance = deck.reduce((accum, val) => {
    const oldBalance = lastValueOf(accum);
    const leverage = calculateQuadraticDecay(
      oldBalance / desiredRetirement,
      Math.abs(quadraticDecayFactor) * -1,
      Math.abs(linearDecayFactor) * -1,
      baseLeverage,
    );
    
    const cashAllocation = (1 - leverage) * oldBalance;
    const equityAllocation = leverage * (oldBalance) * val;
    const newBalance = cashAllocation + equityAllocation;

    return [...accum, newBalance + savingsPerPeriod];
  }, [startingBalance]);

  return balance;

}

function calculateQuadraticDecay (
  progressToRetirement: number,
  a: number, 
  b: number, 
  c: number, 
  ) {

    const leverage = 
      a * Math.pow(progressToRetirement, 2) +
      b * progressToRetirement + 
      c;

    return leverage;
}