
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

/** Utility functions */

export function balanceToCashFlow(balances:number[]) {
  const initialBalance = balances[0] ?? 0;
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
// sort by cash flow - back to original