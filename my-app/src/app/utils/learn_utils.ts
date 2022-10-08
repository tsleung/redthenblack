

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
    const leverage = Math.max(0, calculateQuadraticDecay(
      oldBalance / desiredRetirement,
      Math.abs(quadraticDecayFactor) * -1,
      Math.abs(linearDecayFactor) * -1,
      baseLeverage,
    ));
    
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


/**
 * Utility theory
 * 
 * Not accumulating in a vacuum. 
 * 
 * 
 * Retirement is an example of a utility, where retirement has a value amount to achieve it and probability of success over a series of payments
 * 
 * Other utilities can simpler, instead of a series of payments, it can be a single payment
 * 
 * This can include a single event, like a wedding.
 * It can be a dream vacation.
 * 
 * It turns out most utilities are sequences of events. College tuition.
 * 
 * To keep numbers simple here, we'll continue to annualize all cash flows to keep units simple
 * 
 * Here's how to annualize a monthly expense into an annual one with no rate changes
 * Here's how to annualize a monthly gain into an annual one, for example a paycheck
 */

/**
 * Discounted cash flows
 * 
 * Converting a series of payments into a single NPV 
 * 
 */

/**
 * Inflation
 * 
 * Typically people think of conversion of currency (dollars) to another asset class (gasoline).

 * Generally when people talk about inflation, they think of it broadly in relation to a basket of goods being tracked by the consumer price index. 
 * 
 * When the price of gas inflates, more dollars are required to be exchanged for an equivalent amount of gas.
 * Alternatively, the same number of dollars will net less gas.
 * 
 * Since we've modeled specific utilities, or the future cost of goods, we can anticipate certain price appreciation for cars/real estate/vacations based on the rate of inflation.
 * 
 * 
 */

/**
 * Gas vs Electric car
 */

/**
 * Inflation and Mortgage Debt
 * 
 * As we've explored inflation directly affects the relationship between dollars and other assets. When debt is taken, it's a "short" on the dollar, where while you pay back a nominal  
 */

/**
 * Rent vs Buy
 * 
 * mortgage amortization schedule
 * 
 * Monthly compounding for a mortgage
 * 
 *  */ 


function amortization(
  years = 30,
  principal = 800000,
  rate = .0287,
  monthlyPayment = 3200,
) {

/**
 * years and the principal amount
 * rate will determined how much goes to interest, this is dependent on outstanding balance of the loan principal
 * the rate of
 * 
 * monthly payments is traditionally fixed for the duration of the mortgage.
 * 
 */

 const numPeriods = years * 12;
 new Array(numPeriods).fill(0).reduce((accum) => {
  const remainingPrincipal:number = accum.length === 0 ? 
    principal:
    lastValueOf(accum);
  const interestPayment = remainingPrincipal * rate;
  const principalPayment = monthlyPayment - interestPayment;

  return [...accum, remainingPrincipal - principalPayment];
 }, []);
}



/**
 * Create a housing buy and sell trade
 * 
 * buy a place, hold onto it for a few years, 
 * 
 * - create a cash flow for saved taxes,this needs to be a function of other 
 * 
 * Every year calculate how much you'll pay to interest, principal, and refund in taxes
 * 1. Interest is cash outflow to the bank, you'll never see it again. this is a true outflow
 * 2. Principal is transfer of asset class from cash to percentage of house. Percentage of house is the mortgage starting percentage for the loan. That percentage will be the fraction of the current value of a home
 * 3. Tax refund is cash inflow from the government
 * There are lots of calculate tax treatments that can be done for buy/rent so we're distilling to cash flow in/out
 * 
 * 
 * calculate probability of events, you don't have to fix a roof every year, but 1 in 25
 * HOA
 * 
 * convert mortgage to annualized cash flow 
 */

/** 
 * Create a rental trade
 * this is just cash outflow
 */


/**
 * Create composable cash flows with hierarchy and drill down
 */
interface CompositeCashFlow{
  children: CompositeCashFlow[];
  cashFlows: CashFlows[];
}

interface CashFlows {
  flows: number[]
}

/**
 * Cash flows are a product of an event on a balance
 * can create a tool to model the events.
 * 
 * this can be fixed, or sampled
 * 
 * absolute or relative
 * 
 * 
 * absolute fixed: single nominal value e.g. a car payment
 * absolute sampled: take a nominal value from a sample
 * 
 * relative fixed: after initializer, change is additive/subtracted
 * relative sampled: after initializer, multiplier is sampled 
 * fixed is only one inc
 */


/**
 * 
 * These need to be able to interact with each other, they're the policy we're describing
 * 
 * 
 * We need to compose the policy of decisions, or a decision tree
 * Decision tree should be able to observe period, balance, utilities, and cash flows, then make a decision
 * 
 * 
 * 
 */



